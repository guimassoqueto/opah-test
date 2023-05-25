import { Pool, type PoolConfig, type QueryResult } from 'pg'
import { type TransactionModel } from '../../../domain/models/transactions'
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from '../../../settings'

const poolConfig: PoolConfig = {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  max: 1, // TODO: valor deve ser outro para prod
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 1000
}

export const pgPool = new Pool(poolConfig)

// singleton
export class PostgresClient {
  public client: Pool = new Pool(poolConfig)

  private static instance: PostgresClient

  private constructor () {}

  public static getInstance (): PostgresClient {
    if (!PostgresClient.instance) {
      PostgresClient.instance = new PostgresClient()
    }

    return PostgresClient.instance
  }

  public async query (query: string, values?: any[]): Promise<QueryResult<any>> {
    const data = await this.client.query(query, values)
    return data
  }

  public async end (): Promise<void> {
    await this.client.end()
  }

  public transactionMapper (obj: any): TransactionModel {
    if (!obj) throw new Error()
    const { amount, ...rest } = obj
    return Object.assign({}, rest, { amount: parseFloat(amount) }) as TransactionModel
  }
}
