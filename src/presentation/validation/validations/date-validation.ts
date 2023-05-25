import { InvalidParamError } from '../../../errors/invalid-param-error'
import { type Validation } from '../validation'
import { type IDateValidation } from '../interfaces/interface-date-validation'

export class DateValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly validator: IDateValidation
  ) {}

  validate (input: any): Error | null {
    const isValid = this.validator.isValid(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
    return null
  }
}
