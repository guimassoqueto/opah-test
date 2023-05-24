import { type TransactionModel, type TransactionType } from '../../../domain/models/transactions'

export interface AddTransactionRepository {
  add: (amount: number, type: TransactionType) => Promise<TransactionModel>
}
