import { type Router } from 'express'
import { expressAdapter } from '../adapters/express'
import { makeCreditDebitController } from '../factories/transactions/debit-credit/credit-debit-factory'

export default function (router: Router): void {
  router.post('/debits', expressAdapter(makeCreditDebitController('D')))
  router.post('/credits', expressAdapter(makeCreditDebitController('C')))
}
