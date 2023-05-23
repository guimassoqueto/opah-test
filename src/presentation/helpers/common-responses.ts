import { type HttpResponse } from '../types/http'
import { ServerError } from '../../errors/server-error'

export function badRequest (error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: error
  }
}

export function notFound (error?: Error): HttpResponse {
  return {
    statusCode: 404,
    body: error
  }
}

export function serverError (error: Error): HttpResponse {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

export function ok (data: any): HttpResponse {
  return {
    statusCode: 200,
    body: data
  }
}
