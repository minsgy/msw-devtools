import { EnhancedDevtoolsRoute } from "@/types"
import { RequestHandler } from "msw"

export const createdUuid = (): string => {
  return self.crypto.randomUUID()
}

export const generatorSerializedRouteHandlers = (
  routes: readonly RequestHandler[]
): EnhancedDevtoolsRoute[] => {
  return routes.map((route) => {
    console.log(route)
    const handlers = Array.isArray((route as any).options)
      ? (route as any).options.map((option: any) => ({
          id: createdUuid(),
          response: JSON.stringify(option.response),
          status: option.status,
          description: option.description,
          origin: "msw",
        }))
      : []
    return {
      id: createdUuid(),
      url: (route.info as any).path,
      method: (route.info as any).method,
      isSkip: (route.info as any).isSkip ?? true,
      handlers,
      delay: 0,
      selectedHandlerIndex: 0,
      description: "MSW Route (auto-generated)",
    }
  })
}
