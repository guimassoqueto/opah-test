import { TransactionModel, TransactionType } from "../../src/domain/models/transactions"
import { AddTransactionModel } from "../../src/domain/usecases/add-transaction"
import { AddTransaction } from "../../src/domain/usecases/add-transaction"
import TransactionController from "../../src/presentation/controllers/transaction/transaction-controller"
import { Validation } from '../../src/presentation/interfaces/validation'
import { HttpRequest } from "../../src/presentation/types/http"

function makeRequest(): HttpRequest {
  return {
    body: {
      amount: 1.99
    }
  }
}

function makeAddTransaction(): AddTransaction {
  class AddTransactionStub implements AddTransaction {
    async add (transaction: AddTransactionModel): Promise<TransactionModel> {
      return new Promise(resolve => resolve({
        id: "any-uuid",
        amount: transaction.amount,
        type: 'D',
        datetime: new Date(2023, 11, 31)
      }))
    };
  }
  return new AddTransactionStub()
}


function makeValidation(): Validation {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

type sutType = {
  sut: TransactionController,
  valitationStub: Validation,
  addTransactionStub: AddTransaction
}

function makeSut(transactionType: TransactionType): sutType {
  const valitationStub = makeValidation()
  const addTransactionStub = makeAddTransaction()
  const sut = new TransactionController(valitationStub, addTransactionStub, transactionType)

  return {
    sut,
    valitationStub,
    addTransactionStub
  }
}

describe('CreditDebitController' , () => {
  test('Deve retornar 400 se o amount não passar na validação', async () => {
    const { sut, valitationStub } = makeSut("C")
    const error = new Error("any error")
    jest.spyOn(valitationStub, "validate").mockReturnValue(error)

    const requestBody = makeRequest()
    delete requestBody.body.amount
    expect(requestBody.body).toEqual({})

    const response = await sut.handle(requestBody)

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(error);
  })

  test('Deve retornar 500 se ocorrer algum erro durante a validação', async () => {
    const { sut, valitationStub } = makeSut("D")
    jest.spyOn(valitationStub, "validate").mockImplementationOnce(() => {
      throw new Error()
    })

    const requestBody: HttpRequest = makeRequest()
    const response = await sut.handle(requestBody)

    expect(response.statusCode).toBe(500);
  })

  test('O valor do amount da requisição deve ser o mesmo recebido como argumento no método add de addTransaction', async () => {
    const transactionType: TransactionType = 'D'
    const { sut, addTransactionStub } = makeSut(transactionType)
    const addSpy = jest.spyOn(addTransactionStub, "add")
    const requestBody: HttpRequest = {
      body: {
        amount: 300.47
      }
    }
    await sut.handle(requestBody)
    expect(addSpy).toHaveBeenCalledWith({"amount": 300.47, "type": "D"})
  })

  test('Deve retornar 200 em caso de sucesso', async () => {
    const { sut } = makeSut('C')
    const requestBody = makeRequest()
    const response = await sut.handle(requestBody)

    expect(response.statusCode).toBe(200)
  })
})
