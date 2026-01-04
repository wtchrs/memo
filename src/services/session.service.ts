import { eq } from "drizzle-orm";
import { Db } from "../db";
import { Session, sessions } from "../db/schema/sessions";
import { HTTPException } from "hono/http-exception";
import { requestContext } from "../middlewares/session";

export class SessionService {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    async getOrGenerate(sessionId?: string): Promise<Session> {
        // expiration = 24 hours
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
        if (sessionId) {
            const [session] = await this.db.select().from(sessions).where(eq(sessions.id, sessionId))
            if (session && session.expiresAt > new Date()) {
                session.expiresAt = expiresAt
                await this.db.update(sessions).set({ expiresAt }).where(eq(sessions.id, sessionId))
                return session
            }
            if (session) await this.db.delete(sessions).where(eq(sessions.id, sessionId))
        }
        const [session] = await this.db.insert(sessions).values({ expiresAt }).returning()
        if (!session) throw new HTTPException(500, { message: 'Something went wrong' })
        return session
    }

    getCurrentUserId(): string | undefined {
        return requestContext.getStore()?.currentUserId;
    }
}
