import { eq } from "drizzle-orm";
import { Db } from "../db";
import { users } from "../db/schema/users";
import { IPasswordEncoder } from "../utils/password-encoder";
import { SessionService } from "./session.service";

export class AuthService {
    private readonly db: Db
    private readonly sessionService: SessionService
    private readonly passwordEncoder: IPasswordEncoder

    constructor(db: Db, sessionService: SessionService, passwordEncoder: IPasswordEncoder) {
        this.db = db
        this.sessionService = sessionService
        this.passwordEncoder = passwordEncoder
    }

    async login(username: string, password: string) {
        const [user] = await this.db.select().from(users).where(eq(users.username, username))
        if (!user) {
            // Timing attack prevention
            await this.passwordEncoder.match(this.passwordEncoder.dummyEncodedPassword, password)
            return false
        }
        if (await this.passwordEncoder.match(user.encodedPassword, password)) {
            await this.sessionService.rotate(user.id)
            return true
        }
        return false
    }

    async logout() {
        await this.sessionService.invalidate()
    }
}
