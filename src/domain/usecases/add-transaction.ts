import { type TransactionModel, type TransactionType } from '../models/transactions'

export interface AddTransaction {
  add: (amount: number, type: TransactionType) => Promise<TransactionModel>
}
