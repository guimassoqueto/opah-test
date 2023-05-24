import express, { type Express } from 'express'
import setUpMiddlewares from './middlewares'
import setUpRoutes from './routes'

const app: Express = express()
setUpMiddlewares(app)
setUpRoutes(app)

export default app
