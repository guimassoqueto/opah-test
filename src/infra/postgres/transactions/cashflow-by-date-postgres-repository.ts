import { type CashFlowByDateRepository } from '../../../data/interfaces/database/transaction'
import { PostgresClient } from '../client/pg-client'
import { type TransactionModel, type CashFlow, type CashFlowByDateModel } from '../../../domain/models/transactions'

function dateTransactions (date: string, resultArray: TransactionModel[]): CashFlowByDateModel {
  const credits: CashFlow[] = []
  const debits: CashFlow[] = []

  for (const transaction of resultArray) {
    if (transaction.type === 'C') {
      const { type, amount, ...rest } = transaction
      credits.push(Object.assign({}, rest, { amount: parseFloat(amount.toString()) }))
    } else {
      const { type, amount, ...rest } = transaction
      debits.push(Object.assign({}, rest, { amount: parseFloat(amount.toString()) }))
    }
  }
  return { date, credits, debits }
}

export class CashFlowByDatePostgresRepository implements CashFlowByDateRepository {
  async get (date: string): Promise<CashFlowByDateModel> {
    const pgClient = PostgresClient.getInstance()
    const queryResult = await pgClient.query(`
      SELECT * FROM transactions 
      WHERE "datetime" 
      BETWEEN '${date} 00:00:00.000' AND '${date} 23:59:59.999'
      ORDER BY "datetime" ASC
    `)
    const resultArray = queryResult.rows
    return dateTransactions(date, resultArray)
  }
}
