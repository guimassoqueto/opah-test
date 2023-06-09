import { GetCurrentBalance } from "../../src/domain/usecases/get-current-balance"
import GetCurrentBalanceController from "../../src/presentation/controllers/transactions/get-current-balance-controller"
import { HttpRequest } from "../../src/presentation/types/http"

function makeGetCurrentBalance(): GetCurrentBalance {
  class GetCurrentBalanceStub implements GetCurrentBalance {
    async get(): Promise<number> {
      return new Promise(resolve => resolve(0))
    }
  }
  return new GetCurrentBalanceStub()
}

type SutType = {
  sut: GetCurrentBalanceController,
  getCurrentBalanceStub: GetCurrentBalance
}

function makeSut(): SutType {
  const getCurrentBalanceStub = makeGetCurrentBalance()
  const sut = new GetCurrentBalanceController(getCurrentBalanceStub)

  return {
    sut,
    getCurrentBalanceStub
  }
}

describe('GetBalanceController' , () => {
  test('Deve retornar 500 caso o método getCurrentBalance lance erro', async () => {
    const { sut, getCurrentBalanceStub } = makeSut()
    const spyGet = jest.spyOn(getCurrentBalanceStub, "get").mockRejectedValueOnce(new Error("any-error"))
    const request: HttpRequest = {}
    const response = await sut.handle(request)
    
    expect(response.statusCode).toBe(500)
  })

  test('Deve retornar 200 caso o saldo retorne corretamente', async () => {
    const { sut } = makeSut()
    const request: HttpRequest = {}
    const response = await sut.handle(request)
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({ balance: 0 })
  })
})
