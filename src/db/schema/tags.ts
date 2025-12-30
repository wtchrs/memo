import { randomUUIDv7 } from "bun";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { memos } from "./memos";

export const tags = pgTable('tags', {
    id: uuid('tags_id').primaryKey().$defaultFn(() => randomUUIDv7()),
    memoId: uuid('memos_id').notNull().references(() => memos.id),
    tag: varchar({ length: 255 }).notNull()
})

export type Tag = InferSelectModel<typeof tags>
export type NewTag = InferInsertModel<typeof tags>
