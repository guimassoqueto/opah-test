import { type Controller } from '../../interfaces/controller'
import { type HttpRequest, type HttpResponse } from '../../types/http'
import { badRequest, ok, serverError } from '../../helpers/common-responses'
import { type Validation } from '../../interfaces/validation'
import loggerConfig from '../../../logger-config'
import { type AddTransaction } from '../../../domain/usecases/add-transaction'

const logger = loggerConfig('DebitController')

export default class DebitController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTransaction: AddTransaction
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    logger.info('New debit request...')
    try {
      const error = this.validation.validate(request.body)
      if (error) return badRequest(error)

      const { amount } = request.body
      const transaction = await this.addTransaction.add(amount, 'D')

      return ok(transaction)
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
