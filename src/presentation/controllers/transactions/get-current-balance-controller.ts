import { type HttpRequest, type HttpResponse } from '../../types/http'
import { type GetCurrentBalance } from '../../../domain/usecases/get-current-balance'
import { ok, serverError } from '../../helpers/common-responses'
import loggerConfig from '../../../logger-config'
import { type Controller } from '../../interfaces'

const logger = loggerConfig('GetBalanceController')

export default class GetCurrentBalanceController implements Controller {
  constructor (private readonly getCurrentBalance: GetCurrentBalance) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    logger.info('New GetCurrentBalance Request...')
    try {
      const balance = await this.getCurrentBalance.get()
      return ok({ balance })
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
