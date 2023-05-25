import { InvalidParamError } from '../../src/errors/invalid-param-error'
import { IDateValidation } from '../../src/presentation/validation/interfaces/interface-date-validation'
import { DateValidation } from '../../src/presentation/validation/validations'

function makeValidator(): IDateValidation {
  class DateValidatorStub implements IDateValidation {
    isValid (date: string): boolean {
      return true
    }
  }
  return new DateValidatorStub()
}

type SutType = {
  sut: DateValidation
  validatorStub: IDateValidation
}

function makeSut(): SutType {
  const validatorStub = makeValidator()
  const sut = new DateValidation('date', validatorStub)
  return {
    sut,
    validatorStub
  }
}

describe('DateValidation' , () => {
  test('Deve lançar erro se o validator falhar', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })

  test('DateValidator deve ser chamado com o valor correto', () => { 
    const { sut, validatorStub } = makeSut()
    const isValidSpy = jest.spyOn(validatorStub, "isValid")
    const input = { date: "2023-12-31" }
    sut.validate(input)

    expect(isValidSpy).toHaveBeenCalledWith("2023-12-31")
  })

  test('Deve retornar o erro se a validação não passar', () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, "isValid").mockReturnValueOnce(false)
    const input = { date: "invalid-date" }
    const result = sut.validate(input)
    const error = new InvalidParamError("date")

    expect(result).toEqual(error)
  })

})
