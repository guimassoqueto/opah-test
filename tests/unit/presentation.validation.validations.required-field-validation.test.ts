import { MissingParamError } from '../../src/errors/missing-param-error'
import { RequiredFieldValidation } from "../../src/presentation/validation/validations/required-field-validation"


describe('RequiredField' , () => {
  test('Deve retornar MissingParamError se a chave nao estiver presente', () => {
    const sut = new RequiredFieldValidation("amount")
    const result = sut.validate({name: "any_name"}) 

    expect(result).toEqual(new MissingParamError("amount"))
  })

})