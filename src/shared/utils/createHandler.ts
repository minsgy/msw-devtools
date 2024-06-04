import { DevtoolsRoute } from "@/types"
import {
  HttpHandler,
  HttpMethods,
  HttpRequestHandler,
  HttpResponse,
  RequestHandler,
} from "msw"

export const createHandler = (
  handler: DevtoolsRoute
): RequestHandler | null => {
  const { method, url, handlers } = handler

  const httpHandler = createHttpHandler(method)
  return httpHandler(url, (info) => {
    const handler = handlers[0]
    console.log(handler)
    return HttpResponse.json(handler.response)
  })
}

export const createHttpHandler = <Method extends HttpMethods | RegExp>(
  method: Method
): HttpRequestHandler => {
  return (path, resolver, options = {}) => {
    return new HttpHandler(method, path, resolver, options)
  }
}
