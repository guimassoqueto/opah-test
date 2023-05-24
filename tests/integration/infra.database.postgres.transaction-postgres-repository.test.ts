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

  test('Deve retornar uma transação se a inserção do dado ocorrer adequadamente', async () => {
    const sut = makeSut()
    const transactionToBeAdded = makeTransaction('C')
    const account = await sut.add(transactionToBeAdded)

    expect(account).toBeTruthy()
    expect(account.amount).toBe(transactionToBeAdded.amount)
    expect(account.type).toBe(transactionToBeAdded.type)
  })
})