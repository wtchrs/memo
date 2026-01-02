import { HTTPException } from 'hono/http-exception'

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
