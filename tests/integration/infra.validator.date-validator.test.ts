import { DateValidator } from "../../src/infra/validator/date-validator"

describe('DateValidator' , () => {
  test('Deve retornar falso se a data passada não for do tipo yyyy-mm-dd', () => {
    const dateValidator = new DateValidator()
    const result = dateValidator.isValid("01-01-2003")
    expect(result).toBeFalsy()
  })

  test('Deve retornar falso se o dia for digito unico', () => {
    const dateValidator = new DateValidator()
    const result = dateValidator.isValid("2003-01-1")
    expect(result).toBeFalsy()
  })

  test('Deve retornar falso se o mes for digito unico', () => {
    const dateValidator = new DateValidator()
    const result = dateValidator.isValid("2003-1-01")
    expect(result).toBeFalsy()
  })

  test('Deve retornar falso para dia adicional de ano ano bissexto', () => {
    const dateValidator = new DateValidator()
    const result1 = dateValidator.isValid("2020-02-29") // bissexto
    const result2 = dateValidator.isValid("2021-02-29") // nao-bissexto
    const result3 = dateValidator.isValid("2022-02-29") // nao-bissexto
    const result4 = dateValidator.isValid("2023-02-29") // nao-bissexto
    const result5 = dateValidator.isValid("2024-02-29") // bissexto

    expect(result1).toBeTruthy()
    expect(result2).toBeFalsy()
    expect(result3).toBeFalsy()
    expect(result4).toBeFalsy()
    expect(result5).toBeTruthy()
  })
})
