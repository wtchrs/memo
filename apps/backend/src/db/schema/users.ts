import { randomUUIDv7 } from "bun";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("users_id").primaryKey().$defaultFn(() => randomUUIDv7()),
    username: varchar({ length: 255 }).notNull().unique(),
    email: varchar({ length: 255 }).notNull(),
    encodedPassword: varchar('encoded_password', { length: 255 }).notNull(),
})

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>
