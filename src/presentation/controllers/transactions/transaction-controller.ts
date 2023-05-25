import { type Controller } from '../../interfaces/controller'
import { type HttpRequest, type HttpResponse } from '../../types/http'
import { badRequest, created, serverError } from '../../helpers/common-responses'
import { type Validation } from '../../validation/validation'
import { type AddTransaction } from '../../../domain/usecases/add-transaction'
import { type TransactionType } from '../../../domain/models/transactions'
import loggerConfig from '../../../logger-config'

const logger = loggerConfig('CreditDebitController')

export default class TransactionController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addTransaction: AddTransaction,
    private readonly transactionType: TransactionType
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    logger.info(`New ${this.transactionType === 'D' ? 'Debit' : 'Credit'} Request...`)
    try {
      const error = this.validation.validate(request.body)

      if (error) {
        logger.error(error)
        return badRequest(error)
      }

      const { amount } = request.body
      const transaction = await this.addTransaction.add({
        amount,
        type: this.transactionType
      })

      return created(transaction)
    } catch (error) {
      logger.error(error)
      return serverError(error)
    }
  }
}
