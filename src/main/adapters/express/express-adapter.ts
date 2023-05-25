import { type Request, type Response } from 'express'
import { type Controller } from '../../../presentation/interfaces'
import {
  type HttpRequest,
  type HttpResponse
} from '../../../presentation/types/http'

export function expressAdapter (controller: Controller) {
  return async (req: Request, res: Response) => {
    const HttpRequest: HttpRequest = {
      query: req.query,
      body: req.body,
      params: req.params
    }

    const httpResponse: HttpResponse = await controller.handle(HttpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode < 400) res.status(httpResponse.statusCode).json(httpResponse.body)
    else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
