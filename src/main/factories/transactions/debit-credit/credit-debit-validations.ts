import {
  ValidationComposite,
  RequiredFieldValidation,
  AmountValidation
} from '../../../../presentation/validation'
import { type Validation } from '../../../../presentation/interfaces'

export function makeDebitCreditValidations (): ValidationComposite {
  const validations: Validation[] = []

  validations.push(new RequiredFieldValidation('amount'))
  validations.push(new AmountValidation('amount'))

  return new ValidationComposite(validations)
}
