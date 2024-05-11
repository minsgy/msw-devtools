import { useWorkerValue } from "../hooks/useMswDevtoolsContext"
import { generatorSerializedRouteHandlers } from "../utils/generatorSerializedRouteHandlers"
import { List } from "./ui/typography"

export const DevtoolsHandlers = () => {
  // Add React.FC type annotation
  const worker = useWorkerValue()
  const handlers = worker?.listHandlers() ?? []
  const serializedHandlers = generatorSerializedRouteHandlers(handlers)

  return (
    <List>
      {serializedHandlers.map((handler) => (
        <li key={handler.id}>
          {handler.method} {handler.url}
        </li>
      ))}
    </List>
  )
}
