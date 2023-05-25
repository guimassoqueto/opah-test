import { ValidationComposite } from '../../../../presentation/validation/validation-composite'
import { type Validation } from '../../../../presentation/interfaces'
import {
  AmountValidation,
  RequiredFieldValidation
} from '../../../../presentation/validation/validations'

export function makeDebitCreditValidations (): ValidationComposite {
  const validations: Validation[] = []

  validations.push(new RequiredFieldValidation('amount'))
  validations.push(new AmountValidation('amount'))

  return new ValidationComposite(validations)
}
