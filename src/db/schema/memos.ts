import { randomUUIDv7 } from "bun";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const memos = pgTable("memos", {
    id: uuid('memos_id').primaryKey().$defaultFn(() => randomUUIDv7()),
    userId: uuid('users_id').notNull().references(() => users.id),
    type: varchar({ enum: ['TEXT', 'LINK', 'MEDIA'] }).notNull().default('TEXT'),
    title: varchar().notNull().default(''),
    content: varchar().notNull().default(''),
    // TODO: Add columns for LINK and MEDIA types
})

export type Memo = InferSelectModel<typeof memos>
export type NewMemo = InferInsertModel<typeof memos>
