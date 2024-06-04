import { EnhancedDevtoolsRoute } from "@/types"
import { HttpHandler } from "msw"
import { SetupWorkerApi } from "msw/lib/browser"

export const createdUuid = (): string => {
  return self.crypto.randomUUID()
}

export const generatorSerializedRouteHandlers = (
  handlers: ReturnType<SetupWorkerApi["listHandlers"]> | HttpHandler[]
): EnhancedDevtoolsRoute[] => {
  return handlers.map((handler) => ({
    id: createdUuid(),
    url: (handler.info as any).path,
    method: (handler.info as any).method,
    isUsed: (handler.info as any).isUsed ?? false,
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
  }))
}
