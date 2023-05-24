import { type TransactionModel, type TransactionType } from '../models/transactions'

export interface AddTransactionModel {
  amount: number
  type: TransactionType
}

export interface AddTransaction {
  add: (transaction: AddTransactionModel) => Promise<TransactionModel>
}
