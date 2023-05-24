import { APP_PORT } from '../settings'
import loggerConfig from '../logger-config'
import app from './config/app'

const logger = loggerConfig('main')

app.listen(APP_PORT, () => {
  logger.info(`server is running at ${APP_PORT}`)
})
