import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols'
import { type GetCurrentBalance } from '../../../domain/usecases/get-current-balance'
import { ok, serverError } from '../../helpers/common-responses'
import loggerConfig from '../../../logger-config'

const logger = loggerConfig('GetBalanceController')

export default class GetBalanceController implements Controller {
  constructor (private readonly getCurrentBalance: GetCurrentBalance) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    logger.info('New GetBalance Request...')
    try {
      const balance = await this.getCurrentBalance.get()
      return ok({ balance })
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
