import { TransactionModel, DebitOrCredit } from "../../src/domain/models/transactions"
import { AddTransaction } from "../../src/domain/usecases/add-transaction"
import DebitController from "../../src/presentation/controllers/debit/debit-controller"
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
    async add (amount: number, _: DebitOrCredit): Promise<TransactionModel> {
      return new Promise(resolve => resolve({
        id: "any-uuid",
        amount: amount,
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
  sut: DebitController,
  valitationStub: Validation,
  addTransactionStub: AddTransaction
}

function makeSut(): sutType {
  const valitationStub = makeValidation()
  const addTransactionStub = makeAddTransaction()
  const sut = new DebitController(valitationStub, addTransactionStub)

  return {
    sut,
    valitationStub,
    addTransactionStub
  }
}

describe('DebitController' , () => {
  test('Deve retornar 400 se o amount não passar na validação', async () => {
    const { sut, valitationStub } = makeSut()
    const error = new Error("any error")
    jest.spyOn(valitationStub, "validate").mockReturnValue(error)

    const requestBody = makeRequest()
    delete requestBody.body.amount
    expect(requestBody.body).toEqual({})

    const response = await sut.handle(requestBody)

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(error);
  })
})
