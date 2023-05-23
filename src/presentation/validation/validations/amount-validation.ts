import { InvalidParamError } from '../../../errors/invalid-param-error'
import { type Validation } from '../../interfaces/validation'

export class AmountValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    if (typeof input[this.fieldName] !== 'number') return new InvalidParamError(this.fieldName)
    if (input[this.fieldName] <= 0) return new InvalidParamError(this.fieldName)
    if (input[this.fieldName].toString().split('.')[1].length > 2) return new InvalidParamError(this.fieldName)
    return null
  }
}
