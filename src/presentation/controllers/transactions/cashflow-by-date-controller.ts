import { type Controller, type Validation } from '../../interfaces/'

import loggerConfig from '../../../logger-config'
import { badRequest, serverError, ok } from '../../helpers/common-responses'
import { type CashFlowByDate } from '../../../domain/usecases/cashflow-by-date'
import { type HttpRequest, type HttpResponse } from '../../types/http'

const logger = loggerConfig('CashflowByDateController')

export default class CashflowByDateController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly cashFlowByDate: CashFlowByDate
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    logger.info('New Cashflow Request...')
    try {
      const error = this.validation.validate(request.params)
      if (error) {
        logger.error(error)
        return badRequest(error)
      }

      const { date } = request.params
      const cashflow = await this.cashFlowByDate.get(date)

      return ok(cashflow)
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
