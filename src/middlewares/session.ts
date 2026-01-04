import { createMiddleware } from 'hono/factory'
import { getCookie, setCookie } from 'hono/cookie'
import { AsyncLocalStorage } from 'node:async_hooks'
import { HonoVariables } from '../types'

export interface RequestContext {
    sessionId?: string
    currentUserId?: string
    data: unknown
}

export const requestContext = new AsyncLocalStorage<RequestContext>()

export const sessionMiddleware = createMiddleware<{ Variables: HonoVariables }>(async (c, next) => {
    const sessionId = getCookie(c, 'sessionId')
    const { id, userId, data, expiresAt } = await c.get('sessionService').getOrGenerate(sessionId)
    if (sessionId !== id) setCookie(c, 'sessionId', id, { httpOnly: true, secure: true, expires: expiresAt })
    await requestContext.run(
        { sessionId: id, currentUserId: userId || undefined, data },
        next
    )
})
