import { EnhancedDevtoolsRoute } from "@/types"
import { RequestHandler } from "msw"

export const createdUuid = (): string => {
  return self.crypto.randomUUID()
}

export const generatorSerializedRouteHandlers = (
  handlers: readonly RequestHandler[]
): EnhancedDevtoolsRoute[] => {
  return handlers.map((handler) => ({
    id: createdUuid(),
    url: (handler.info as any).path,
    method: (handler.info as any).method,
    isSkip: (handler.info as any).isSkip ?? true,
    handlers: [
      {
        id: createdUuid(),
        response: {
          test: "test",
        },
        status: 200,
        delay: 0,
        description: "MSW Handler (auto-generated)",
        origin: "msw",
      },
    ],
    selectedHandlerIndex: 0,
    description: "MSW Route (auto-generated)",
  }))
}
