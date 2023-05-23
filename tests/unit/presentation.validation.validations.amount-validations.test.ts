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

  test('Deve retornar erro quando a chave amount tiver mais de duas casas decimais', () => {
    const amountValidation = new AmountValidation('amount')
    const obj = {
      amount: 49.998
    }
    const result = amountValidation.validate(obj)

    expect(result).toBeInstanceOf(Error)
  })

  test('Deve retornar erro quando a chave amount for menor que zero', () => {
    const amountValidation = new AmountValidation('amount')
    const obj = {
      amount: -17.50
    }
    const result = amountValidation.validate(obj)

    expect(result).toBeInstanceOf(Error)
  })

  test('Deve retornar erro quando a chave amount for igual a zero', () => {
    const amountValidation = new AmountValidation('amount')
    const obj1 = { amount: 0.00 }
    const result1 = amountValidation.validate(obj1)
    expect(result1).toBeInstanceOf(Error)

    const obj2 = { amount: 0 }
    const result2 = amountValidation.validate(obj2)
    expect(result2).toBeInstanceOf(Error)
  })

  test('Deve retornar null quando o amount for um valor válido', () => {
    const amountValidation = new AmountValidation('amount')
    const obj1 = { amount: 19.99 }
    const result1 = amountValidation.validate(obj1)
    expect(result1).toBeNull()

    const obj2 = { amount: 15.8 }
    const result2 = amountValidation.validate(obj2)
    expect(result2).toBeNull()

    const obj3 = { amount: 5 }
    const result3 = amountValidation.validate(obj3)
    expect(result3).toBeNull()
  })
})
