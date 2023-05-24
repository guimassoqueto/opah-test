import { type TransactionModel } from '../../../domain/models/transactions'
import { type AddTransactionModel } from '../../../domain/usecases/add-transaction'

export interface AddTransactionRepository {
  add: (transaction: AddTransactionModel) => Promise<TransactionModel>
}
