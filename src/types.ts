import { Db } from './db';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';
import { IPasswordEncoder } from './utils/password-encoder';


export type HonoVariables = {
    db: Db
    userService: UserService
    sessionService: SessionService
    passwordEncoder: IPasswordEncoder
    authService: AuthService
}
