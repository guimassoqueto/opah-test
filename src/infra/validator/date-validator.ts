import validator from 'validator'
import { type IDateValidation } from '../../presentation/validation/interfaces'

const options: validator.IsDateOptions = {
  format: 'yyyy-mm-dd',
  strictMode: true
}

export class DateValidator implements IDateValidation {
  isValid (date: string): boolean {
    return validator.isDate(date, options)
  }
}
