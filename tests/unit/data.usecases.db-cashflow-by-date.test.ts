import { DbCashFlowByDate } from '../../src/data/usecases/db-cashflow-by-date'
import { CashFlowByDateRepository } from '../../src/data/interfaces/database/transaction/cashflow-by-date-repository'
import { CashFlowByDateModel } from '../../src/domain/models/transactions'

function makeCashFlowByDateRepository(): CashFlowByDateRepository {
  class CashFlowByDateRepositoryStub implements CashFlowByDateRepository {
    get (date: string): Promise<CashFlowByDateModel> {
      return new Promise(resolve => resolve({
        date,
        credits: [],
        debits: []
      }))
    }
  }

  return new CashFlowByDateRepositoryStub()
}

type SutType = {
  sut: DbCashFlowByDate
  cashFlowByDateRepositoryStub: CashFlowByDateRepository
}

function makeSut(): SutType {
  const cashFlowByDateRepositoryStub = makeCashFlowByDateRepository()
  const sut = new DbCashFlowByDate(cashFlowByDateRepositoryStub)

  return {
    sut,
    cashFlowByDateRepositoryStub
  }
}


describe('DbGetCurrentBalance' , () => {
  test('Deve lançar exceção se ocorrer erro durante a busca do saldo', async () => {
    const { sut, cashFlowByDateRepositoryStub } = makeSut()
    jest.spyOn(cashFlowByDateRepositoryStub, "get").mockRejectedValueOnce(
      new Error()
    )
    const promise = sut.get("2023-12-31")

    await expect(promise).rejects.toThrow()
  })

  test('A funcao get do CashFlowRepository deve ser chamada com os valores corretos', async () => {
    const { sut, cashFlowByDateRepositoryStub } = makeSut()
    const getSpy = jest.spyOn(cashFlowByDateRepositoryStub, "get")
    await sut.get("2023-12-31")

    expect(getSpy).toHaveBeenCalledWith("2023-12-31")
  })

  test('Deve retornar o valor adequado caso a busca pelo fluxo de caixa seja bem sucedida', async () => {
    const { sut } = makeSut()
    const cashFlow = await sut.get("2023-12-31")

    expect(cashFlow.date).toBe("2023-12-31")
    expect(cashFlow.credits.length).toBe(0)
    expect(cashFlow.debits.length).toBe(0)
  })
})
