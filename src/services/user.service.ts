import { eq } from "drizzle-orm";
import { db, Tx } from "../db";
import { NewUser, User, users } from "../db/schema/users";
import { DuplicateError } from "../error";

// TODO: Implement login handler

export async function registerUser(user: NewUser): Promise<User> {
    try {
        // TODO: Encode password
        const [created] = await db.insert(users).values(user).returning()
        return created
    } catch (e: any) {
        if (e.code === '23505') {
            throw new DuplicateError('username')
        }
        throw e
    }
}

export async function getUser(username: string, tx: Tx = db): Promise<User> {
    const [user] = await tx.select().from(users).where(eq(users.username, username))
    return user
}
