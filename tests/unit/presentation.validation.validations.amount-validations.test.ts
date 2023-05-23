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

  test('Deve retornar erro quando a chave amount não for do tipo number', () => {
    const amountValidation = new AmountValidation('amount')
    const obj1 = { amount: '49.90' }
    const result1 = amountValidation.validate(obj1)
    expect(result1).toBeInstanceOf(Error)

    const obj2 = { amount: ['49.90'] }
    const result2 = amountValidation.validate(obj2)
    expect(result2).toBeInstanceOf(Error)

    const obj3 = { amount: true }
    const result3 = amountValidation.validate(obj3)
    expect(result3).toBeInstanceOf(Error)
  })

})
