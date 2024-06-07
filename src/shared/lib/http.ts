import { ROUTE_METHODS } from "@/constants"
import {
  DefaultBodyType,
  HttpHandler,
  HttpResponseResolver,
  Path,
  PathParams,
  http as originHttp,
} from "msw"

// 1. constant definition
const HTTP_METHODS = ROUTE_METHODS.map((method) =>
  method.toLowerCase()
) as (keyof typeof originHttp)[]

// 2. proxy method creation
const createProxyMethod = <
  Params extends PathParams<keyof Params> = PathParams,
  RequestBodyType extends DefaultBodyType = DefaultBodyType,
  ResponseBodyType extends DefaultBodyType = undefined,
  RequestPath extends Path = Path,
>(
  method: keyof typeof originHttp
): HttpRequestHandler<
  Params,
  RequestBodyType,
  ResponseBodyType,
  RequestPath
> => {
  return new Proxy(originHttp[method], {
    apply: (target, thisArg, argArray) => {
      const [url, responseHandlers] = argArray
      const responseHandlersWithPresets = (...rest: any) =>
        responseHandlers(...rest)
      const result = Reflect.apply(target, thisArg, [
        url,
        responseHandlersWithPresets,
      ])
      result.presets = (presets: HttpPreset[]) =>
        Reflect.apply(target, thisArg, [
          url,
          responseHandlersWithPresets,
          presets,
        ])
      return result
    },
  }) as HttpRequestHandler<
    Params,
    RequestBodyType,
    ResponseBodyType,
    RequestPath
  >
}

// 3. type definition
type HttpPreset = {
  status: number
  description: string
  response: any
}

type HttpRequestHandler<
  Params extends PathParams<keyof Params> = PathParams,
  RequestBodyType extends DefaultBodyType = DefaultBodyType,
  ResponseBodyType extends DefaultBodyType = undefined,
  RequestPath extends Path = Path,
> = (
  path: RequestPath,
  resolver: HttpResponseResolver<Params, RequestBodyType, ResponseBodyType>
) => HttpHandler & {
  presets: (presets: HttpPreset[]) => HttpHandler
}

// 4. custom http object creation
let http = originHttp as {
  [method in keyof typeof originHttp]: HttpRequestHandler
}

// 5. method assignment
HTTP_METHODS.forEach((method: keyof typeof originHttp) => {
  http[method] = createProxyMethod(method)
})

export { http }
