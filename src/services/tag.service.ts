import { and, eq, inArray } from "drizzle-orm";
import { Db, Tx } from "../db";
import { Memo, memos } from "../db/schema/memos";
import { Tag, tags } from "../db/schema/tags";
import { Owned } from "../utils";

export class TagService {
    private readonly db: Db

    constructor(db: Db) {
        this.db = db
    }

    async addTags(newTags: string[], memo: Owned<Memo>, tx: Tx = this.db): Promise<Tag[]> {
        const mapped = newTags.map((tag) => ({ memoId: memo.id, tag }))
        return await tx
            .insert(tags)
            .values(mapped)
            .onConflictDoNothing({ target: [tags.memoId, tags.tag] })
            .returning()
    }

    async removeTags(removeTags: string[], memo: Owned<Memo>, tx: Tx = this.db): Promise<Tag[]> {
        return await tx
            .delete(tags)
            .where(and(
                eq(tags.memoId, memo.id),
                inArray(tags.tag, removeTags),
            ))
            .returning()
    }

    async updateTags(updateTags: string[], memo: Owned<Memo>, tx: Tx = this.db) {
        const exists = new Set((await this.getMemoTags(memo, tx)).map(m => m.tag))
        const target = new Set(updateTags)
        await this.removeTags(exists.difference(target).values().toArray(), memo, tx)
        await this.addTags(target.difference(exists).values().toArray(), memo, tx)
    }

    async getMemoTags(memo: Owned<Memo>, tx: Tx = this.db): Promise<Tag[]> {
        return await tx
            .select()
            .from(tags)
            .where(eq(tags.memoId, memo.id))
    }

    async getAllMemosTags(memoArray: Owned<Memo>[], tx: Tx = this.db) {
        if (memoArray.length === 0) return {}

        const memoIds = memoArray.map(({ id }) => id)
        const allTags = await tx
            .select()
            .from(tags)
            .where(inArray(tags.memoId, memoIds))

        return allTags.reduce((acc, { memoId, tag }) => {
            (acc[memoId] ??= []).push(tag)
            return acc
        }, {} as Record<string, string[]>)
    }

    async getAllMemosTagsWithIds(memoIds: string[], userId: string, tx: Tx = this.db) {
        if (memoIds.length === 0) return {}

        const allTags = await tx
            .select({ memoId: tags.memoId, tag: tags.tag })
            .from(tags)
            .innerJoin(memos, eq(memos.id, tags.memoId))
            .where(and(
                eq(memos.userId, userId),
                inArray(memos.id, memoIds),
            ))

        return allTags.reduce((acc, { memoId, tag }) => {
            (acc[memoId] ??= []).push(tag)
            return acc
        }, {} as Record<string, string[]>)
    }
}
