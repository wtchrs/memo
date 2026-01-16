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
        const created = await c.get('db').transaction(async (tx) => {
            const created = await c.get('memoService').create(req, userId, tx)
            await c.get('tagService').addTags(req.tags, created, tx)
            return created
        })
        return c.json({ success: true, memoId: created.id })
    }
)

app.get(
    '/',
    async (c) => {
        const userId = c.get('sessionService').getCurrentUserId()
        if (!userId) throw new UnauthorizedError()
        const userMemos = await c.get('memoService').getUserMemos(userId)
        const tagMap = await c.get('tagService').getAllMemosTags(userMemos)
        const mapped = userMemos.map(({ userId, ...memo }) => ({
            ...memo,
            tags: tagMap[memo.id] ?? []
        }))
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
        const memo = await c.get('memoService').getMemo(memoId, userId)
        const tags = (await c.get('tagService').getMemoTags(memo)).map((t) => t.tag)
        const { userId: _, ...memoRes } = memo
        return c.json({ ...memoRes, tags })
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
        const { tags, ...updateMemo } = c.req.valid('json')
        await c.get('db').transaction(async (tx) => {
            await c.get('memoService').update(updateMemo, memoId, userId, tx)
            if (tags) {
                const memo = await c.get('memoService').getMemo(memoId, userId)
                await c.get('tagService').updateTags(tags, memo, tx)
            }
        })
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
