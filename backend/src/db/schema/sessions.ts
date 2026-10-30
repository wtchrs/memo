import { randomBytes } from "node:crypto"
import { index, jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const sessions = pgTable('sessions', {
    id: varchar('sessions_id', { length: 255 })
        .primaryKey()
        .$defaultFn(() => randomBytes(16).toHex()),
    userId: uuid('users_id').references(() => users.id),
    data: jsonb().notNull().$defaultFn(() => ({})),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
}, (t) => [
    index().on(t.expiresAt)
])

export type Session = InferSelectModel<typeof sessions>
export type NewSession = InferInsertModel<typeof sessions>
