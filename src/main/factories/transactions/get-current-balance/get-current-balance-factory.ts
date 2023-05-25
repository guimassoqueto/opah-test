import GetCurrentBalanceController from '../../../../presentation/controllers/transactions/get-current-balance-controller'
import { DbGetCurrentBalance } from '../../../../data/usecases/db-get-current-balance'
import { GetCurrentBalancePostgresRepository } from '../../../../infra/postgres/transactions/get-current-balance-postgres-repository'
import { type Controller } from '../../../../presentation/interfaces'

export function makeGetCurrentBalanceController (): Controller {
  const getCurrentBalanceRepository = new GetCurrentBalancePostgresRepository()
  const getCurrentBalance = new DbGetCurrentBalance(getCurrentBalanceRepository)
  return new GetCurrentBalanceController(getCurrentBalance)
}
