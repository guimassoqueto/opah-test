import { type GetCurrentBalanceRepository } from '../../../../data/interfaces/database/transaction/get-current-balance-repository'
import { PostgresClient } from '../client/pg-client'

export class GetCurrentBalancePostgresRepository implements GetCurrentBalanceRepository {
  async get (): Promise<number> {
    const pgClient = PostgresClient.getInstance()
    const queryResult = await pgClient.query(`
      SELECT SUM(amount) AS "total", "type" 
      FROM transactions 
      GROUP BY "type"
      ORDER BY "type" DESC;
    `)
    const resultArray = queryResult.rows

    if (resultArray.length === 1) {
      if (resultArray[0].type === 'D') return parseFloat(resultArray[0].total) * -1
      if (resultArray[0].type === 'C') return parseFloat(resultArray[0].total)
    }

    if (resultArray.length === 2) {
      const difference = parseFloat(resultArray[0].total) - parseFloat(resultArray[1].total)
      return Math.round((difference + Number.EPSILON) * 100) / 100
    }

    return 0
  }
}
