import { type AddTransactionRepository } from '../../../../data/database/interfaces/add-transaction'
import { type TransactionType, type TransactionModel } from '../../../../domain/models/transactions'
import { pgClient, transactionMapper } from '../client/pg-client'

export class TransactionPostgresRepository implements AddTransactionRepository {
  async add (amount: number, type: TransactionType): Promise<TransactionModel> {
    const result = await pgClient.query(
      'INSERT INTO transactions(amount, "type") VALUES($1, $2) RETURNING *',
      [amount, type]
    )
    return transactionMapper(result)
  }
}
