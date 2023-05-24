import { type AddTransactionRepository } from '../../../../data/database/interfaces/add-transaction'
import { type TransactionModel } from '../../../../domain/models/transactions'
import { type AddTransactionModel } from '../../../../domain/usecases/add-transaction'
import { PostgresClient } from '../client/pg-client'

export class TransactionPostgresRepository implements AddTransactionRepository {
  async add (transaction: AddTransactionModel): Promise<TransactionModel> {
    const pgClient = PostgresClient.getInstance()
    const result = await pgClient.query(
      'INSERT INTO transactions(amount, "type") VALUES($1, $2) RETURNING *',
      [transaction.amount, transaction.type]
    )
    await pgClient.end()
    return pgClient.transactionMapper(result.rows[0])
  }
}
