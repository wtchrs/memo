import { Hono } from 'hono'
import { db } from './db'
import { UserService } from './services/user.service'
import { SessionService } from './services/session.service'
import { AuthService } from './services/auth.service'
import { HonoVariables } from './types'
import { Argon2idPasswordEncoder } from './utils/password-encoder'
import { MemoService } from './services/memo.service'
import { TagService } from './services/tag.service'
import routeApp from './routes'


const app = new Hono<{ Variables: HonoVariables }>()

const passwordEncoder = new Argon2idPasswordEncoder()
const sessionService = new SessionService(db)
const userService = new UserService(db, passwordEncoder)
const authService = new AuthService(db, sessionService, passwordEncoder)
const memoService = new MemoService(db)
const tagService = new TagService(db)

app.use(async (c, next) => {
    c.set('db', db)
    c.set('passwordEncoder', passwordEncoder)
    c.set('sessionService', sessionService)
    c.set('userService', userService)
    c.set('authService', authService)
    c.set('memoService', memoService)
    c.set('tagService', tagService)
    await next()
})

app.use(sessionService.getMiddleware())

app.route("/api", routeApp)

export default app
export type AppType = typeof routeApp
