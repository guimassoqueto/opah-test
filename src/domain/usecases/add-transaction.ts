import { type TransactionModel, type DebitOrCredit } from '../models/transactions'

export interface AddTransaction {
  add: (amount: number, type: DebitOrCredit) => Promise<TransactionModel>
}
