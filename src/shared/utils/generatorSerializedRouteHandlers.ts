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
      : [
          {
            id: createdUuid(),
            response: JSON.stringify((route as any).response),
            status: (route as any).status,
            description: (route as any).description,
            origin: "msw",
          },
        ]
    return {
      id: createdUuid(),
      url: (route.info as any).path,
      method: (route.info as any).method,
      isSkip: (route.info as any).isSkip ?? true,
      handlers,
      delay: 0,
      selectedHandlerId: handlers[0]?.id,
      description: "MSW Route (auto-generated)",
    }
  })
}
