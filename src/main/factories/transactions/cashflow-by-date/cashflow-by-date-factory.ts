import CashFlowByDateController from '../../../../presentation/controllers/transactions/cashflow-by-date-controller'
import { makeCashFlowByDateValidations } from './cashflow-by-date-validations'
import { DbCashFlowByDate } from '../../../../data/usecases/db-cashflow-by-date'
import { CashFlowByDatePostgresRepository } from '../../../../infra/postgres/transactions/cashflow-by-date-postgres-repository'
import { type Controller } from '../../../../presentation/interfaces'

export function makeCashFlowByDateController (): Controller {
  const validations = makeCashFlowByDateValidations()
  const cashFlowByDatePostgresRepository = new CashFlowByDatePostgresRepository()
  const dbCashFlowByDate = new DbCashFlowByDate(cashFlowByDatePostgresRepository)

  return new CashFlowByDateController(validations, dbCashFlowByDate)
}
