import { randomUUIDv7 } from "bun";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, index, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const memos = pgTable("memos", {
    id: uuid('memos_id').primaryKey().$defaultFn(() => randomUUIDv7()),
    userId: uuid('users_id').notNull().references(() => users.id),
    type: varchar({ length: 255, enum: ['TEXT', 'LINK', 'MEDIA'] }).notNull().default('TEXT'),
    title: text().notNull().default(''),
    content: text().notNull().default(''),
    trash: boolean().notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    // TODO: Add columns for LINK and MEDIA types
}, (t) => [
    index().on(t.userId, t.createdAt)
])

export type Memo = InferSelectModel<typeof memos>
export type NewMemo = InferInsertModel<typeof memos>
