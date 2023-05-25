import { DbAddTransaction } from '../../../../data/usecases/db-add-transaction'
import { type Controller } from '../../../../presentation/interfaces'
import { TransactionPostgresRepository } from '../../../../infra/postgres/transactions/transaction-postgres-repository'
import { type TransactionType } from '../../../../domain/models/transactions'
import { makeDebitCreditValidations } from './credit-debit-validations'
import TransactionController from '../../../../presentation/controllers/transactions/transaction-controller'

export function makeCreditDebitController (transactionType: TransactionType): Controller {
  const addTransactionRepository = new TransactionPostgresRepository()
  const dbAddTransaction = new DbAddTransaction(addTransactionRepository)
  const validation = makeDebitCreditValidations()

  return new TransactionController(validation, dbAddTransaction, transactionType)
}
