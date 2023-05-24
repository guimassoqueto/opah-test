import { GetCurrentBalancePostgresRepository } from '../../src/infra/database/postgres/transactions/get-current-balance-postgres-repository'
import { pgPool } from '../../src/infra/database/postgres/client'
import { PoolClient } from 'pg'

let client: PoolClient;
describe('TransactionPostgresRepository add' , () => {
  beforeEach(async () => {
    client = await pgPool.connect()
    await client.query(`TRUNCATE TABLE transactions;`)
  })
  afterAll(() => {
    pgPool.end()
  })


})