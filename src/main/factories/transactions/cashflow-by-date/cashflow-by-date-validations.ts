import { ValidationComposite } from '../../../../presentation/validation/validation-composite'
import { DateValidation } from '../../../../presentation/validation/validations/date-validation'
import { type Validation } from '../../../../presentation/interfaces'
import {
  DateValidator
} from '../../../../infra/validator/date-validator'

export function makeCashFlowByDateValidations (): ValidationComposite {
  const validations: Validation[] = []

  const dateValidation = new DateValidation('date', new DateValidator())
  validations.push(dateValidation)

  return new ValidationComposite(validations)
}
