import { type Router } from 'express'
import { expressAdapter } from '../adapters/express'
import { makeCreditDebitController } from '../factories/transactions/debit-credit/credit-debit-factory'

export default function (router: Router): void {
  router.post('/debit', expressAdapter(makeCreditDebitController('D')))
  router.post('/credit', expressAdapter(makeCreditDebitController('C')))
}
