import { type Request, type Response } from 'express'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse
} from '../../../presentation/protocols'

export function expressAdapter (controller: Controller) {
  return async (req: Request, res: Response) => {
    const HttpRequest: HttpRequest = {
      query: req.query,
      body: req.body,
      params: req.params
    }

    const httpResponse: HttpResponse = await controller.handle(HttpRequest)
    if (res.statusCode >= 200 && res.statusCode < 400) res.status(httpResponse.statusCode)
    else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
