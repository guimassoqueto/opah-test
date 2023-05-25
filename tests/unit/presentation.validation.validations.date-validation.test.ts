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

})
