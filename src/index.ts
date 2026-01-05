import { Hono } from 'hono'
import userRoute from './routes/users'
import authRoute from './routes/auth'
import { db } from './db'
import { UserService } from './services/user.service'
import { SessionService } from './services/session.service'
import { HonoVariables } from './types'

const app = new Hono<{ Variables: HonoVariables }>()
const userService = new UserService(db)
const sessionService = new SessionService(db)

app.use(async (c, next) => {
    c.set('db', db)
    c.set('userService', userService)
    c.set('sessionService', sessionService)
    await next()
})

app.use(sessionService.getMiddleware())

app.route('/api/users', userRoute)
app.route('/api/auth', authRoute)

export default app
