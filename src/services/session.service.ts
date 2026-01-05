import { eq, sql } from "drizzle-orm";
import { Db, isTransaction, Tx } from "../db";
import { Session, sessions } from "../db/schema/sessions";
import { HTTPException } from "hono/http-exception";
import { AsyncLocalStorage } from 'node:async_hooks'
import { createMiddleware } from "hono/factory";
import { getCookie, setCookie } from "hono/cookie";
import { HonoVariables } from "../types";

export interface SessionContext {
    sessionId?: string
    currentUserId?: string
    data: Record<string, any>
    expiresAt: Date
}

function getExpiresAt() {
    // expiration: 24 hours
    return new Date(Date.now() + 24 * 60 * 60 * 1000)
}

function isRequiredUpdateExpiration(expiresAt: Date) {
    // Update expiresAt if it remains less than 1/2
    return expiresAt.getTime() - Date.now() < 12 * 60 * 60 * 1000
}

type GetSessionOptions = {
    sessionId?: string
    tx?: Tx
};

type GenerateSessionOpsions = {
    userId?: string
    data?: Record<string, any>
    expiresAt?: Date
    tx?: Tx
};

export class SessionService {
    private db: Db
    private sessionContext = new AsyncLocalStorage<SessionContext>()

    constructor(db: Db) {
        this.db = db
    }

    getMiddleware = () => createMiddleware<{ Variables: HonoVariables }>(async (c, next) => {
        const sessionIdCookie = getCookie(c, 'sessionId')

        await this.sessionContext.run({
            sessionId: sessionIdCookie,
            data: {},
            expiresAt: new Date(0)
        } as SessionContext, async () => {
            const { id, userId, data, expiresAt } = await c.get('sessionService').getSession({ sessionId: sessionIdCookie })

            const store = this.sessionContext.getStore()
            if (store) {
                store.sessionId = id
                store.currentUserId = userId || undefined
                store.data = data as any
                store.expiresAt = expiresAt
            }

            await next()

            const finalStore = this.sessionContext.getStore()
            if (finalStore?.sessionId) {
                setCookie(c, 'sessionId', finalStore.sessionId, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'Lax',
                    expires: finalStore.expiresAt,
                })
            }
        })
    })

    async invalidate(tx: Tx = this.db) {
        const store = this.sessionContext.getStore()
        if (store?.sessionId) {
            await tx
                .delete(sessions)
                .where(eq(sessions.id, store.sessionId))
        }
        if (store) {
            store.sessionId = undefined
            store.currentUserId = undefined
            store.data = {}
            // Expire cookie immediately in middleware
            store.expiresAt = new Date(0)
        }
    }

    async rotate(userId?: string) {
        const store = this.sessionContext.getStore()
        await this.db.transaction(async (tx) => {
            await this.invalidate(tx)
            const session = await this.generateSession({ userId, data: store?.data, tx })
            if (store) {
                store.sessionId = session.id
                store.currentUserId = session.userId || undefined
                store.data = session.data as any
                store.expiresAt = session.expiresAt
            }
        })
    }

    async get(key: string) {
        return this.sessionContext.getStore()!.data[key]
    }

    async set(key: string, value: any, tx: Tx = this.db) {
        const store = this.sessionContext.getStore()!

        await tx
            .update(sessions)
            .set({
                data: sql`jsonb_set(
                    COALESCE(${sessions.data}, '{}'::jsonb),
                    ARRAY[${key}],
                    ${JSON.stringify(value)}::jsonb
                )`
            })
            .where(eq(sessions.id, store.sessionId!))

        store.data[key] = value
    }

    async remove(key: string, tx: Tx = this.db) {
        const store = this.sessionContext.getStore()!

        await tx
            .update(sessions)
            .set({ data: sql`COALESCE($sessions.data, '{}'::jsonb) - ${key}` })
            .where(eq(sessions.id, store.sessionId!))

        delete store.data[key]
    }

    getCurrentUserId(): string | undefined {
        return this.sessionContext.getStore()?.currentUserId;
    }

    private async generateSession({ userId, data, expiresAt, tx = this.db }: GenerateSessionOpsions) {
        const newExpiresAt = expiresAt || getExpiresAt()

        const [session] = await tx
            .insert(sessions)
            .values({ userId, data, expiresAt: newExpiresAt })
            .returning()

        if (!session) throw new HTTPException(500, { message: 'Something went wrong' })
        return session
    }

    private async getSession({
        sessionId,
        tx = this.db,
    }: GetSessionOptions): Promise<Session> {
        const newExpiresAt = getExpiresAt()
        if (sessionId) {
            const txRun = async (tx: Tx) => {
                const [session] = await tx.select().from(sessions).where(eq(sessions.id, sessionId)).for('update')
                if (session && session.expiresAt > new Date()) {
                    if (isRequiredUpdateExpiration(session.expiresAt)) {
                        session.expiresAt = newExpiresAt
                        await tx.update(sessions).set({ expiresAt: newExpiresAt }).where(eq(sessions.id, sessionId))
                    }
                    return session
                }
                if (session) await tx.delete(sessions).where(eq(sessions.id, sessionId))
            }
            const result = isTransaction(tx) ?
                await txRun(tx) :
                await tx.transaction(txRun)
            if (result) return result
        }
        // Generate if the session does not exist
        return await this.generateSession({ expiresAt: newExpiresAt, tx })
    }
}
