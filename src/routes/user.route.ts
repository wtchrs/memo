import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import * as z from 'zod'
import { HTTPException } from 'hono/http-exception';
import { HonoVariables } from '../types';
import { registerSchema, usernameSchema } from '../schemas/user.schema';

const app = new Hono<{ Variables: HonoVariables }>()

app.post(
    '/register',
    zValidator('json', registerSchema),
    async (c) => {
        if (c.get('sessionService').getCurrentUserId())
            throw new HTTPException(400, { message: 'Already logged in' })
        const { username, email, password } = c.req.valid('json')
        const result = await c.get('userService').registerUser({ username, email, rawPassword: password })
        if (!result) throw new HTTPException(500, { message: 'Something went wrong' })
        return c.json({ success: true })
    }
)

app.get(
    '/:username',
    zValidator('param', z.object({ username: usernameSchema })),
    async (c) => {
        const { username } = c.req.valid('param')
        const { encodedPassword, ...user } = await c.get('userService').getUser(username)
        return c.json(user)
    }
)

export default app
