export interface HttpRequest {
  query?: any
  params?: any
  body?: any
}

export interface HttpResponse {
  statusCode: number
  body?: any
}
