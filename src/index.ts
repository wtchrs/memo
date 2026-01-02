import { Hono } from 'hono'
import { contextMiddleware } from './middlewares/context'
import userRoute from './routes/users'

const app = new Hono()

app.use(contextMiddleware)
app.route('/api/users', userRoute)

export default app
