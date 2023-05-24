import { TransactionType } from '../../src/domain/models/transactions'
import { AddTransactionModel } from '../../src/domain/usecases/add-transaction'
import { TransactionPostgresRepository } from '../../src/infra/database/postgres/transactions/transaction-postgres-repository'

function makeTransaction(type: TransactionType): AddTransactionModel {
  const amount = parseFloat((Math.random() * 100).toFixed())
  return {
    amount,
    type,
  }
}

function makeSut(): TransactionPostgresRepository {
  return new TransactionPostgresRepository()
}

describe('TransactionPostgresRepository add' , () => {


})