import request from 'supertest'
import app from '../../src/main/config/app'
import { Request, Response } from 'express'

describe('contentType middleware' , () => {
  test('Deve retornar que o Content-Type do cabeçalho é do tipo application/json', async () => {
    app.get('/test-content-type', (req: Request, res: Response) => {
      res.send()
    })

    await request(app)
      .get('/test-content-type')
      .expect('Content-Type', /json/ig) // utiliza validação via regex pois nem sempre o retorno é exatamente application/json
  })

  test('Deve retornar Content-Type em outro formato quando forçado', async () => {
    app.get('/test-content-type-png', (req: Request, res: Response) => {
      res.type('png')
      res.send()
    })

    await request(app)
      .get('/test-content-type-png')
      .expect('Content-Type', /png/ig)
  })
})
