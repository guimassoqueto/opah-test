import CashflowByDateController from '../../src/presentation/controllers/transactions/cashflow-by-date-controller'
import { CashFlowByDate } from '../../src/domain/usecases/cashflow-by-date'
import { Validation } from '../../src/presentation/validation/validation'
import { HttpRequest } from '../../src/presentation/types/http'
import { CashFlowByDateModel } from '../../src/domain/models/transactions'

function makeRequest(): HttpRequest {
  return {
    params: {
      date: "2023-01-01"
    }
  }
}

function makeCashFlowByDate(): CashFlowByDate {
  class CashFlowByDateStub implements CashFlowByDate {
    get (date: string): Promise<CashFlowByDateModel> {
      return new Promise(resolve => resolve({
        date,
        credits: [],
        debits: []
      }))
    }
  }
  return new CashFlowByDateStub()
}

function makeValidation(): Validation {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: CashflowByDateController
  validationStub: Validation,
  cashFlowByDateStub: CashFlowByDate
}

function makeSut(): SutTypes {
  const validationStub = makeValidation()
  const cashFlowByDateStub = makeCashFlowByDate()
  const sut = new CashflowByDateController(validationStub, cashFlowByDateStub)
  return {
    sut,
    validationStub,
    cashFlowByDateStub
  }
}

describe('CashFlowByDateController' , () => {
  test('Deve retornar 400 se o parâmetro passado na rota não passar na validação', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, "validate").mockReturnValue(new Error("any-erro"))
    const request = makeRequest()
    const response = await sut.handle(request) 

    expect(response.statusCode).toBe(400)
  })

  test('o metodo validate deve requeber o valor correto', async () => {
    const { sut, validationStub } = makeSut()
    const spyValidate = jest.spyOn(validationStub, "validate").mockReturnValue(new Error("any-erro"))
    const request = makeRequest()
    await sut.handle(request) 

    expect(spyValidate).toBeCalledWith(request.params)
  })

  test('o metodo get deve requeber o valor correto', async () => {
    const { sut, cashFlowByDateStub } = makeSut()
    const spyGet = jest.spyOn(cashFlowByDateStub, "get")
    const request = makeRequest()
    await sut.handle(request) 

    expect(spyGet).toBeCalledWith(request.params.date)
  })

  test('deve retornar 500 se o cashFlowByDate lançar erro', async () => {
    const { sut, cashFlowByDateStub } = makeSut()
    const spyGet = jest.spyOn(cashFlowByDateStub, "get").mockImplementationOnce(() => {
      throw new Error("some error")
    })
    const request = makeRequest()
    const response = await sut.handle(request) 

    expect(response.statusCode).toBe(500)
  })

  test('deve retornar 500 se o validation lançar erro', async () => {
    const { sut, validationStub } = makeSut()
    const spyValidate = jest.spyOn(validationStub, "validate").mockImplementationOnce(() => {
      throw new Error("some error")
    })
    const request = makeRequest()
    const response = await sut.handle(request) 

    expect(response.statusCode).toBe(500)
  })

  test('deve retornar 200 se a aplicação executar conforme o esperado', async () => {
    const { sut } = makeSut()
    const request = makeRequest()
    const reponse = await sut.handle(request) 

    expect(reponse.statusCode).toBe(200)
  })
})
