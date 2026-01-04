import { Db } from './db';
import { SessionService } from './services/session.service';
import { UserService } from './services/user.service';


export type HonoVariables = {
    db: Db
    userService: UserService
    sessionService: SessionService
}
