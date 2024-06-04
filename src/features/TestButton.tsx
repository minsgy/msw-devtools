import { useRoute } from "@/providers/useMswDevtoolsContext"
import { createHandler } from "@/shared/utils/createHandler"
import {
  createdUuid,
  generatorSerializedRouteHandlers,
} from "@/shared/utils/generatorSerializedRouteHandlers"
import { HttpMethods } from "msw"

export const TestButton = () => {
  const { route, handleRouteChange } = useRoute()
  return (
    <button
      onClick={async () => {
        const id = createdUuid()
        const http = createHandler({
          method: HttpMethods.GET,
          url: "https://api.example.com/testtesttest",
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
          selectedHandler: "",
          id,
        })

        const result = await http?.run({
          request: new Request(new URL("https://api.example.com/testtesttest")),
          requestId: id,
        })

        if (!result) {
          return null
        }
        const serializedRoute = generatorSerializedRouteHandlers([
          result.handler,
        ])
        console.log("serializedRoute", serializedRoute)
        console.log("route", route)

        handleRouteChange((prev) => [...prev, ...serializedRoute])
      }}
    >
      Test
    </button>
  )
}
