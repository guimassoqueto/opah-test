import { InvalidParamError } from '../../../errors/invalid-param-error'
import { type Validation } from '../validation'
import { type IDateValidation } from '../interfaces/interface-date-validation'

export class DateValidation implements Validation {
  constructor (
    private readonly validator: IDateValidation
  ) {}

  validate (input: any): Error | null {
    const isValid = this.validator.isValid(input as string)
    if (!isValid) return new InvalidParamError('date format')
    return null
  }
}
