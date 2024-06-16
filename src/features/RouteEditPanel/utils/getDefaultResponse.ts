import { createdUuid } from "@/shared/utils/generatorSerializedRouteHandlers"
import { DevtoolsHandler } from "@/types"

export const getDefaultResponse = (id: number): DevtoolsHandler => ({
  id: createdUuid(),
  response: "{}",
  status: 200,
  description: `msw devtools handler - response ${id}`,
  origin: "msw",
})
