import { ROUTE_METHODS } from "@/constants"
import {
  DefaultBodyType,
  HttpHandler as OriginHttpHandler,
  HttpResponseResolver,
  Path,
  PathParams,
  http as originHttp,
} from "msw"

type HttpHandler = OriginHttpHandler & {
  presets: (presets: HttpPreset[]) => OriginHttpHandler
}

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
      const result: HttpHandler = Reflect.apply(target, thisArg, [
        url,
        responseHandlersWithPresets,
      ])

      const response: Response = responseHandlers()
      const { status, statusText } = response
      function presets(presets: HttpPreset[]) {
        // TODO: response.json() async
        const json = response.json()

        const defaultResponseWithPresets: HttpPreset[] = [
          ...presets,
          {
            status,
            description: statusText,
            response: json, // TODO: response.json() async
          },
        ]
        return Reflect.apply(target, thisArg, [
          url,
          responseHandlersWithPresets,
          defaultResponseWithPresets,
        ]) as HttpHandler
      }

      result.presets = presets
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

export type HttpRequestHandler<
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

export type Http = {
  [method in keyof typeof originHttp]: HttpRequestHandler
}

// 4. custom http object creation
const http = originHttp as Http

// 5. method assignment
HTTP_METHODS.forEach(async (method: keyof typeof originHttp) => {
  http[method] = await createProxyMethod(method)
})

export { http }
