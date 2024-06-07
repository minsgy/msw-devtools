import { DevtoolsRoute } from "@/types"
import { faker } from "@faker-js/faker"
import {
  HttpHandler,
  HttpMethods,
  HttpRequestHandler,
  HttpResponse,
  RequestHandler,
  delay,
} from "msw"

export const createHandler = (route: DevtoolsRoute): RequestHandler | null => {
  const { method, url, handlers, selectedHandlerIndex } = route

  const httpHandler = createHttpHandler(method)
  return httpHandler(url, async (info) => {
    const handler = handlers[selectedHandlerIndex]
    const jsonResponse = JSON.parse(handler.response)

    if (jsonResponse) {
      recursiveTransform(jsonResponse, (key, value) => {
        if (typeof value === "number") {
          return value
        }

        if (value.startsWith("faker.")) {
          return resolveFakerValue(key, value)
        }

        return value
      })
    }

    if (route.delay) {
      await delay(route.delay)
    }

    return HttpResponse.json(jsonResponse ?? { message: "No Response" })
  })
}

export const createHttpHandler = <Method extends HttpMethods | RegExp>(
  method: Method
): HttpRequestHandler => {
  return (path, resolver, options = {}) => {
    return new HttpHandler(method, path, resolver, options)
  }
}

const resolveFakerValue = (key: string, value: string) => {
  const fnSandbox = Function("faker", `return ${value}`)
  const result = fnSandbox.call(undefined, faker)
  return typeof result === "function" ? result.call() : result
}

const recursiveTransform = (
  json: Record<string, any>,
  walkFn: (key: string, value: string | number) => string | number
) => {
  const keys = Object.keys(json)
  for (const key of keys) {
    const value = json[key]

    if (Array.isArray(value)) {
      value.forEach((item) => recursiveTransform(item, walkFn))
      return
    }

    if (typeof value === "object") {
      recursiveTransform(value, walkFn)
      return
    }

    json[key] = walkFn(key, value)
  }
}
