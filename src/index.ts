import { Hono } from 'hono'
import userRoute from './routes/users'
import authRoute from './routes/auth'
import { db } from './db'
import { UserService } from './services/user.service'
import { SessionService } from './services/session.service'
import { AuthService } from './services/auth.service'
import { HonoVariables } from './types'
import { Argon2idPasswordEncoder } from './utils/password-encoder'

const app = new Hono<{ Variables: HonoVariables }>()
const passwordEncoder = new Argon2idPasswordEncoder()
const userService = new UserService(db, passwordEncoder)
const sessionService = new SessionService(db)
const authService = new AuthService(db, sessionService, passwordEncoder)

app.use(async (c, next) => {
    c.set('db', db)
    c.set('userService', userService)
    c.set('sessionService', sessionService)
    c.set('passwordEncoder', passwordEncoder)
    c.set('authService', authService)
    await next()
})

app.use(sessionService.getMiddleware())

app.route('/api/users', userRoute)
app.route('/api/auth', authRoute)

export default app
