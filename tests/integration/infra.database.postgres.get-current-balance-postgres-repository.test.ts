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

  test(`
    Deve retornar zero quando o total de débitos for igual ao total de créditos 
    (ponto flutuante)
  `, async () => {
    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.50, 'D'])

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.50, 'C'])

    client.release()

    const sut = new GetCurrentBalancePostgresRepository()
    const balance = await sut.get()

    expect(balance).toBe(0)
  })

  test(`
    Deve retornar zero quando o total de débitos for igual o total de 
    créditos (inteiros)
  `, async () => {
    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10, 'D'])

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10, 'C'])

    client.release()

    const sut = new GetCurrentBalancePostgresRepository()
    const balance = await sut.get()

    expect(balance).toBe(0)
  })

  test(`
    Deve retornar a diferença correta e positiva quando o total de créditos for 
    maior que o total de débitos (ponto flutuante)
  `, async () => {
    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.49, 'C'])

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.48, 'D'])

    client.release()

    const sut = new GetCurrentBalancePostgresRepository()
    const balance = await sut.get()

    expect(balance).toBe(0.01)
  })

  test(`
  Deve retornar a diferença correta e negativa quando o total de créditos for 
  menor que o total de débitos (ponto flutuante)
    `, async () => {
    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.49, 'C'])

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [11.51, 'D'])

    client.release()

    const sut = new GetCurrentBalancePostgresRepository()
    const balance = await sut.get()

    expect(balance).toBe(-1.02)
  })

  test(`
  Deve retornar a diferença correta e positiva quando o total de créditos for 
  maior que o total de débitos (inteiros)
  `, async () => {
    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [15, 'C'])

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10, 'D'])

    client.release()

    const sut = new GetCurrentBalancePostgresRepository()
    const balance = await sut.get()

    expect(balance).toBe(5)
  })

  test(`
  Deve retornar o valor absoluto positivo, caso haja apenas operaçoes de crédito
  `, async () => {

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.49, 'C'])

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.50, 'C'])

    client.release()

    const sut = new GetCurrentBalancePostgresRepository()
    const balance = await sut.get()

    expect(balance).toBe(20.99)
    expect(balance).toBeGreaterThan(0)
  })

  test(`
  Deve retornar o valor absoluto negativo, caso haja apenas operaçoes de débito
  `, async () => {

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.49, 'D'])

    await client.query(`
    INSERT INTO transactions(amount, "type") 
    VALUES($1, $2)
    `, [10.50, 'D'])

    client.release()

    const sut = new GetCurrentBalancePostgresRepository()
    const balance = await sut.get()

    expect(balance).toBe(-20.99)
    expect(balance).toBeLessThan(0)
  })

  test(`
  Deve retornar zero quando não existirem operações feitas no banco (nenhuma transação ocorreu)
  `, async () => {
    const sut = new GetCurrentBalancePostgresRepository()
    const balance = await sut.get()
    client.release()

    expect(balance).toBe(0)
  })
})