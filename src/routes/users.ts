import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import * as z from 'zod'
import { getCurrentUserId } from '../services/auth.service';
import { HTTPException } from 'hono/http-exception';
import { getUser, registerUser } from '../services/user.service';

const app = new Hono()

const registerSchema = z.object({
    username: z.string()
        .regex(/^[a-zA-Z0-9]+$/, { message: 'Only alphabets and numbers are allowed' })
        .max(255),
    email: z.email({ message: 'Not valid email format' }),
    password: z.string().max(255),
    passwordConfirm: z.string().max(255)
}).refine(
    (schema) => schema.password === schema.passwordConfirm,
    { message: 'password confirmation is different from password' }
)

app.post(
    '/register',
    zValidator('json', registerSchema),
    async (c) => {
        if (getCurrentUserId()) throw new HTTPException(400, { message: 'Already logged in' })
        const { username, email, password } = c.req.valid('json')
        const result = registerUser({ username, email, encodedPassword: password })
        if (!result) throw new HTTPException(500, { message: 'Something went wrong' })
        return c.json({ success: true })
    }
)

app.get(
    '/:username',
    zValidator('param', z.object({ username: z.string().regex(/^[a-zA-Z0-9]+$/) })),
    async (c) => {
        const { username } = c.req.valid('param')
        const { encodedPassword, ...user } = await getUser(username)
        return c.json(user)
    }
)

export default app
