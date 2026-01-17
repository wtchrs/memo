import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { HonoVariables } from '../types';
import { authSchema } from '../schemas/auth.schema';
import { UnauthenticatedError } from '../error';

const app = new Hono<{ Variables: HonoVariables }>()

app.post(
    '/login',
    zValidator('json', authSchema),
    async (c) => {
        const { username, password } = c.req.valid('json')
        if (await c.get('authService').login(username, password))
            return c.json({ success: true })
        throw new UnauthenticatedError()
    }
)

app.post('/logout', async (c) => {
    await c.get('authService').logout()
    return c.json({ success: true })
})

export default app
