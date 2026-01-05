import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import z from 'zod';
import { HonoVariables } from '../types';

const app = new Hono<{ Variables: HonoVariables }>()

const authSchema = z.object({
    username: z.string()
        .regex(/^[a-zA-Z0-9]+$/, { message: 'Only alphabets and numbers are allowed' })
        .max(255),
    password: z.string().max(255),
})

app.post('/login', zValidator('json', authSchema), async (c) => {
    const { username, password } = c.req.valid('json')
    return await c.get('authService').login(username, password) ?
        c.json({ success: true }) :
        c.json({ success: false }, 401)
})

app.post('/logout', async (c) => {
    await c.get('authService').logout()
    return c.json({ success: true })
})

export default app
