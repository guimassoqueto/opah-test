import { AmountValidation } from "../../src/presentation/validation/validations/amount-validation"

describe('AmountValidation' , () => {
  test('Deve retornar erro quando a chave amount não estiver presente', () => {
    const amountValidation = new AmountValidation('amount')
    const obj = {
      test: '123'
    }
    const result = amountValidation.validate(obj)

    expect(result).toBeInstanceOf(Error)
  })

})
