import { MiddlewareHandler } from "hono"
import { getCookie } from "hono/cookie"
import { AsyncLocalStorage } from "node:async_hooks"

export interface RequestContext {
    sessionId?: string
    currentUserId?: string
}

export const requestContext = new AsyncLocalStorage<RequestContext>()

export const contextMiddleware: MiddlewareHandler = async (c, next) => {
    const sessionId = getCookie(c, 'sessionId')
    // TODO: Find userId from sessionId
    return requestContext.run({ sessionId }, next)
}
