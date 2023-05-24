import { Pool, type PoolConfig } from 'pg'
import { type TransactionModel } from '../../../../domain/models/transactions'
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER
} from '../../../../settings'

const poolConfig: PoolConfig = {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  max: 20,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 5000
}

export const pgClient = new Pool(poolConfig)
pgClient.connect()
  .then(() => {})
  .catch(error => { console.error(error) })

export function transactionMapper (obj: any): TransactionModel {
  if (!obj) throw new Error()
  const { amount, ...rest } = obj
  return Object.assign({}, rest, { amount: parseFloat(amount) }) as TransactionModel
}

// Singleton
// export class PostgresHelper {
//   public client: PoolClient
//   public uri: string

//   private static instance: PostgresHelper

//   private constructor () {}

//   public static getInstance (): PostgresHelper {
//     if (!PostgresHelper.instance) {
//       PostgresHelper.instance = new PostgresHelper()
//     }

//     return PostgresHelper.instance
//   }

//   public async connect (): Promise<void> {
//     this.client = await new Pool(poolConfig).connect()
//   }

//   public async query (query: string, values?: any[]): Promise<QueryResult<any>> {
//     const data = await this.client.query(query, values)
//     return data
//   }

//   // TODO: modificar
//   public mapper<T>(obj: any): T {
//     if (!obj) throw new Error()
//     const { _id, ...rest } = obj
//     return Object.assign({}, rest, { id: _id.toString() }) as T
//   }
// }
