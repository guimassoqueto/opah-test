import { type HttpRequest, type HttpResponse } from '../types/http'

export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}
