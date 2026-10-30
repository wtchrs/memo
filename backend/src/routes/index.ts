import { Hono } from 'hono'
import { HonoVariables } from '../types'
import authRoute from './auth.route'
import memoRoute from './memo.route'
import userRoute from './user.route'

const routeApp = new Hono<{ Variables: HonoVariables }>()
    .route('/users', userRoute)
    .route('/auth', authRoute)
    .route('/memos', memoRoute)

export default routeApp
