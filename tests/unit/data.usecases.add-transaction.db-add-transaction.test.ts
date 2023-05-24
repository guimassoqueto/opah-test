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

  test('Deve chamar addTransactionRepository com os valores corretos', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    const spyAdd = jest.spyOn(addTransactionRepositoryStub, "add")
    const transaction = makeTransaction()
    await sut.add(transaction)

    expect(spyAdd).toHaveBeenCalledWith(transaction)
  })

  test('Deve retornar a transaction inserida no banco corretamente', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    const transaction = makeTransaction()
    const transactionDataDB = await sut.add(transaction)

    expect(transactionDataDB).toBeTruthy()
    expect(transactionDataDB.id).toBe("any-uuid")
    expect(transactionDataDB.amount).toBe(transaction.amount)
    expect(transactionDataDB.type).toBe(transaction.type)
    expect(transactionDataDB.datetime).toBeInstanceOf(Date)
  })
})
