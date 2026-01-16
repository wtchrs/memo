import z from "zod";
import { Db, Tx } from "../db";
import { markOwned, Owned } from "../utils";
import { Memo, memos } from "../db/schema/memos";
import { and, eq } from "drizzle-orm";
import { NotFoundError } from "../error";

export const createMemoSchema = z.object({
    type: z.enum(['TEXT', 'LINK', 'MEDIA'], { message: 'type must be TEXT, LINK or MEDIA' }),
    title: z.string(),
    content: z.string(),
    tags: z.array(z.string().nonempty({ message: 'Empty tag is not allowed' }))
})

export type CreateMemoRequest = z.infer<typeof createMemoSchema>

export const updateMemoSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tags: z
        .array(z.string().nonempty({ message: 'Empty tag is not allowed' }))
        .optional(),
})

export type UpdateMemoRequest = z.infer<typeof updateMemoSchema>

export class MemoService {
    private readonly db: Db

    constructor(db: Db) {
        this.db = db
    }

    async create({ tags, ...memo }: CreateMemoRequest, userId: string, tx: Tx = this.db): Promise<Owned<Memo>> {
        const [created] = await tx
            .insert(memos)
            .values({ ...memo, userId })
            .returning()
        return markOwned(created)
    }

    async getUserMemos(userId: string, tx: Tx = this.db): Promise<Owned<Memo>[]> {
        const findMemos = await tx
            .select()
            .from(memos)
            .where(and(
                eq(memos.userId, userId),
                eq(memos.trash, false)
            ))
        return findMemos.map(markOwned)
    }

    async getMemo(memoId: string, userId: string, tx: Tx = this.db): Promise<Owned<Memo>> {
        const [memo] = await tx
            .select()
            .from(memos)
            .where(and(
                eq(memos.id, memoId),
                eq(memos.userId, userId)
            ))
        if (!memo) throw new NotFoundError(memoId)
        return markOwned(memo)
    }

    async update({ tags, ...data }: UpdateMemoRequest, memoId: string, userId: string, tx: Tx = this.db): Promise<Owned<Memo>> {
        const [updated] = await tx
            .update(memos)
            .set(data)
            .where(and(
                eq(memos.id, memoId),
                eq(memos.userId, userId),
            ))
            .returning()
        if (!updated) throw new NotFoundError(memoId)
        return markOwned(updated)
    }

    async moveToTrash(memoId: string, userId: string, tx: Tx = this.db): Promise<Owned<Memo>> {
        return this.setTrash(memoId, userId, true, tx)
    }

    async restoreFromTrash(memoId: string, userId: string, tx: Tx = this.db): Promise<Owned<Memo>> {
        return this.setTrash(memoId, userId, false, tx)
    }

    async deleteMemo(memoId: string, userId: string, tx: Tx = this.db) {
        const [deleted] = await tx
            .delete(memos)
            .where(and(
                eq(memos.id, memoId),
                eq(memos.userId, userId),
                eq(memos.trash, true),
            ))
            .returning()
        if (!deleted) throw new NotFoundError(memoId)
    }

    private async setTrash(memoId: string, userId: string, trash: boolean, tx: Tx = this.db): Promise<Owned<Memo>> {
        const [moved] = await tx
            .update(memos)
            .set({ trash })
            .where(and(
                eq(memos.id, memoId),
                eq(memos.userId, userId),
            ))
            .returning()
        if (!moved) throw new NotFoundError(memoId)
        return markOwned(moved)
    }
}
