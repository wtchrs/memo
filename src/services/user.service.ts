import { eq } from "drizzle-orm";
import { Db, Tx } from "../db";
import { NewUser, User, users } from "../db/schema/users";
import { DuplicateError, NotFoundError } from "../error";

// TODO: Implement login handler

export class UserService {
    private db: Db

    constructor(db: Db) {
        this.db = db
    }

    async registerUser(user: NewUser): Promise<User> {
        try {
            // TODO: Encode password
            const [created] = await this.db.insert(users).values(user).returning()
            return created
        } catch (e: any) {
            if (e.code === '23505') {
                throw new DuplicateError('username')
            }
            throw e
        }
    }

    async getUser(username: string, tx: Tx = this.db): Promise<User> {
        const [user] = await tx.select().from(users).where(eq(users.username, username))
        if (!user) throw new NotFoundError(username)
        return user
    }
}
