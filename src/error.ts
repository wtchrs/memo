import { HTTPException } from 'hono/http-exception'

export class UnauthenticatedError extends HTTPException {
    constructor() {
        super(401, { message: 'Authentication failed.' })
    }
}

export class UnauthorizedError extends HTTPException {
    constructor() {
        super(403, { message: 'Authentication required.' })
    }
}

export class DuplicateError extends HTTPException {
    constructor(field: string) {
        super(409, { message: `'${field}' is duplicate.` })
    }
}

export class NotFoundError extends HTTPException {
    constructor(resource: string) {
        super(404, { message: `'${resource}' is not found.` })
    }
}
