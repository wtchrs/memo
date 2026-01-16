import { Hono } from 'hono'
import userRoute from './routes/users'
import authRoute from './routes/auth'
import memoRoute from './routes/memos'
import { db } from './db'
import { UserService } from './services/user.service'
import { SessionService } from './services/session.service'
import { AuthService } from './services/auth.service'
import { HonoVariables } from './types'
import { Argon2idPasswordEncoder } from './utils/password-encoder'
import { MemoService } from './services/memo.service'

const app = new Hono<{ Variables: HonoVariables }>()
const passwordEncoder = new Argon2idPasswordEncoder()
const sessionService = new SessionService(db)
const userService = new UserService(db, passwordEncoder)
const authService = new AuthService(db, sessionService, passwordEncoder)
const memoService = new MemoService(db)

app.use(async (c, next) => {
    c.set('db', db)
    c.set('passwordEncoder', passwordEncoder)
    c.set('sessionService', sessionService)
    c.set('userService', userService)
    c.set('authService', authService)
    c.set('memoService', memoService)
    await next()
})

app.use(sessionService.getMiddleware())

app.route('/api/users', userRoute)
app.route('/api/auth', authRoute)
app.route('/api/memos', memoRoute)

export default app
