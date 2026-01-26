import { randomUUIDv7 } from "bun";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, unique, uuid, varchar } from "drizzle-orm/pg-core";
import { memos } from "./memos";

export const tags = pgTable('tags', {
    id: uuid('tags_id').primaryKey().$defaultFn(() => randomUUIDv7()),
    memoId: uuid('memos_id').notNull().references(() => memos.id),
    tag: varchar({ length: 255 }).notNull()
}, (t) => [
    unique().on(t.memoId, t.tag),
])

export type Tag = InferSelectModel<typeof tags>
export type NewTag = InferInsertModel<typeof tags>
