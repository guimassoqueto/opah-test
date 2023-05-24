import { GetCurrentBalanceRepository } from '../../src/data/interfaces/database/transaction/get-current-balance-repository'
import { DbGetCurrentBalance } from '../../src/data/usecases/db-get-current-balance'

function makeGetBalanceRepository(): GetCurrentBalanceRepository {
  class GetCurrentBalanceRepositoryStub implements GetCurrentBalanceRepository {
    async get (): Promise<number> {
      return new Promise(resolve => resolve(0))
    }
  }

  return new GetCurrentBalanceRepositoryStub()
}

function makeSut(): SutType {
  const getBalanceRepositoryStub = makeGetBalanceRepository()
  const sut = new DbGetCurrentBalance(getBalanceRepositoryStub)

  return {
    sut,
    getBalanceRepositoryStub
  }
}

type SutType = {
  sut: DbGetCurrentBalance,
  getBalanceRepositoryStub: GetCurrentBalanceRepository
}

describe('DbGetCurrentBalance' , () => {
  test('Deve lançar exceção se ocorrer erro durante a busca do saldo', async () => {
    const { sut, getBalanceRepositoryStub } = makeSut()
    const spyAdd = jest.spyOn(getBalanceRepositoryStub, "get").mockRejectedValueOnce(
      new Error()
    )
    const promise = sut.get()

    await expect(promise).rejects.toThrow()
  })

})
