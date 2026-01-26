import { eq } from "drizzle-orm";
import { Db, Tx } from "../db";
import { User, users } from "../db/schema/users";
import { DuplicateError, NotFoundError } from "../error";
import { IPasswordEncoder } from "../utils/password-encoder";

type RegisterUserRequest = {
    username: string
    email: string
    rawPassword: string
}

export class UserService {
    private readonly db: Db
    private readonly passwordEncoder: IPasswordEncoder

    constructor(db: Db, passwordEncoder: IPasswordEncoder) {
        this.db = db
        this.passwordEncoder = passwordEncoder
    }

    async registerUser({ username, email, rawPassword }: RegisterUserRequest, tx: Tx = this.db): Promise<User> {
        const encodedPassword = await this.passwordEncoder.encode(rawPassword)
        try {
            const [created] = await tx
                .insert(users)
                .values({ username, email, encodedPassword })
                .returning()
            return created
        } catch (e: any) {
            if (e.cause.code === '23505') {
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
