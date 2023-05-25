import { CashFlowByDatePostgresRepository } from '../../src/infra/postgres/transactions'
import { pgPool } from '../../src/infra/postgres/client'
import { PoolClient } from 'pg'
import { TransactionType } from '../../src/domain/models/transactions';

type Transaction = [number, TransactionType, Date]

let client: PoolClient;
describe('TransactionPostgresRepository add' , () => {
  beforeEach(async () => {
    client = await pgPool.connect()
    await client.query(`TRUNCATE TABLE transactions;`)
  })
  afterAll(() => {
    pgPool.end()
  })

  test(`
    Deve retornar a quantia correta de transaçoes referente ao dia especificado
  `, async () => {

    const transaction1: Transaction = [50.50, 'C', new Date(2021, 0, 1, 15)]
    await client.query(`
    INSERT INTO transactions(amount, "type", "datetime") 
    VALUES($1, $2, $3)
    `, transaction1 )

    const transaction2: Transaction = [40.50, 'C',new Date(2021, 0, 1, 16)]
    await client.query(`
    INSERT INTO transactions(amount, "type", "datetime") 
    VALUES($1, $2, $3)
    `, transaction2)

    client.release()

    const sut = new CashFlowByDatePostgresRepository()
    const date = '2021-01-01'
    const result = await sut.get(date)

    expect(result.date).toBe(date)
    expect(result.credits.length).toBe(2)
    expect(result.debits.length).toBe(0)
  })


})