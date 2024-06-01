import { DevtoolsRoute } from "@/types"
import { SetupWorkerApi } from "msw/lib/browser"

export const createdUuid = (): string => {
  return self.crypto.randomUUID()
}

export const generatorSerializedRouteHandlers = (
  handlers: ReturnType<SetupWorkerApi["listHandlers"]>
): DevtoolsRoute[] => {
  return handlers.map((handler) => ({
    id: createdUuid(),
    url: (handler.info as any).path,
    method: (handler.info as any).method,
    handlers: [
      {
        id: createdUuid(),
        response: "",
        status: 200,
        delay: 0,
        description: "MSW Handler (auto-generated)",
        origin: "msw",
      },
    ],
  }))
}
