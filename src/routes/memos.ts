import { Hono } from "hono";
import { HonoVariables } from "../types";
import { zValidator } from "@hono/zod-validator";
import { createMemoSchema, updateMemoSchema } from "../services/memo.service";
import { UnauthorizedError } from "../error";
import z from "zod";

const memoIdParamSchema = z.object({ memoId: z.uuid({ message: 'id must be UUID' }) })

const app = new Hono<{ Variables: HonoVariables }>()

app.post(
    '/',
    zValidator('json', createMemoSchema),
    async (c) => {
        const req = c.req.valid('json')
        const userId = c.get('sessionService').getCurrentUserId()
        if (!userId) throw new UnauthorizedError()
        const created = await c.get('memoService').create(req, userId)
        // TODO: Implement adding tags for the created memo.
        return c.json({ success: true, memoId: created.id })
    }
)

app.get(
    '/',
    async (c) => {
        const userId = c.get('sessionService').getCurrentUserId()
        if (!userId) throw new UnauthorizedError()
        const userMemos = await c.get('memoService').getUserMemos(userId)
        const mapped = userMemos.map(({ userId, ...memo }) => memo)
        return c.json({ count: mapped.length, contents: mapped })
    }
)

app.get(
    '/:memoId',
    zValidator('param', memoIdParamSchema),
    async (c) => {
        const userId = c.get('sessionService').getCurrentUserId()
        if (!userId) throw new UnauthorizedError()
        const { memoId } = c.req.valid('param')
        const { userId: _, ...memo } = await c.get('memoService').getMemo(memoId, userId)
        return c.json(memo)
    }
)

app.put(
    '/:memoId',
    zValidator('param', memoIdParamSchema),
    zValidator('json', updateMemoSchema),
    async (c) => {
        const userId = c.get('sessionService').getCurrentUserId()
        if (!userId) throw new UnauthorizedError()
        const { memoId } = c.req.valid('param')
        const updateMemoReq = c.req.valid('json')
        await c.get('memoService').update(updateMemoReq, memoId, userId)
        // TODO: Implement updating tags for the updated memo.
        return c.json({ success: true })
    }
)

app.put(
    '/:memoId/trash',
    zValidator('param', memoIdParamSchema),
    async (c) => {
        const userId = c.get('sessionService').getCurrentUserId()
        if (!userId) throw new UnauthorizedError()
        const { memoId } = c.req.valid('param')
        await c.get('memoService').moveToTrash(memoId, userId)
        return c.json({ success: true })
    }
)

app.put(
    '/:memoId/restore',
    zValidator('param', memoIdParamSchema),
    async (c) => {
        const userId = c.get('sessionService').getCurrentUserId()
        if (!userId) throw new UnauthorizedError()
        const { memoId } = c.req.valid('param')
        await c.get('memoService').restoreFromTrash(memoId, userId)
        return c.json({ success: true })
    }
)

app.delete(
    '/:memoId',
    zValidator('param', memoIdParamSchema),
    async (c) => {
        const userId = c.get('sessionService').getCurrentUserId()
        if (!userId) throw new UnauthorizedError()
        const { memoId } = c.req.valid('param')
        await c.get('memoService').deleteMemo(memoId, userId)
        return c.json({ success: true })
    }
)

export default app
