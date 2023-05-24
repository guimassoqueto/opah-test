import { DbAddTransaction } from '../../src/data/usecases/add-transaction/db-add-transaction'
import { AddTransactionRepository } from '../../src/data/interfaces/database/transaction/add-transaction-repository'
import { AddTransactionModel } from '../../src/domain/usecases/add-transaction';
import { TransactionModel, TransactionType } from '../../src/domain/models/transactions';

function makeTransaction(): AddTransactionModel {
  return {
    amount: 19.99,
    type: 'C'
  }
}

function makeAddTransactionRepository(): AddTransactionRepository {
  class AddTransactionRepository implements AddTransactionRepository {
    add (transaction: AddTransactionModel): Promise<TransactionModel> {
      return new Promise(resolve => resolve({
        id: "any-uuid",
        amount: 19.99,
        type: 'C',
        datetime: new Date(2023, 11, 31)
      }))
    }
  }
  return new AddTransactionRepository()
}

type SutType = {
  sut: DbAddTransaction
  addTransactionRepositoryStub: AddTransactionRepository
}

function makeSut(): SutType {
  const addTransactionRepositoryStub = makeAddTransactionRepository()
  const sut = new DbAddTransaction(addTransactionRepositoryStub)
  return {
    sut,
    addTransactionRepositoryStub
  }
}

describe('DbAddTransaction' , () => {
  test('Deve lançar exceção se ocorrer erro durante a a inserção da transação', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    const spyAdd = jest.spyOn(addTransactionRepositoryStub, "add").mockRejectedValueOnce(
      new Error()
    )
    const transaction = makeTransaction()
    const promise = sut.add(transaction)

    await expect(promise).rejects.toThrow()
  })

})
