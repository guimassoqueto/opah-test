import { type Router } from 'express'
import { expressAdapter } from '../adapters/express'
import { makeCreditDebitController } from '../factories/transactions/debit-credit/credit-debit-factory'
import { makeGetCurrentBalanceController } from '../factories/transactions/get-current-balance/get-current-balance-factory'

export default function (router: Router): void {
  router.post('/debit', expressAdapter(makeCreditDebitController('D')))
  router.post('/credit', expressAdapter(makeCreditDebitController('C')))
  router.get('/balance', expressAdapter(makeGetCurrentBalanceController()))
}
