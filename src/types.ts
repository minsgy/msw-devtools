import { SetupWorker } from "msw/lib/browser"
import { HttpMethods } from "msw"

export interface MSWDevtoolsProps {
  /**
   * The base url of your requests. This is required to use 'error' mode as it takes the base domain and intercepts any request regardless of the path.
   */
  /**
   * If the worker is not enabled, we won't ever load it and will just load children.
   */
  isEnabled?: boolean
  /**
   * An instance of the MSW worker returned from `setupWorker`.
   */
  worker: SetupWorker
  /**
   * This component takes children so that it can ensure the worker has started before rendering the tree. This guarantees that
   * all requests will be intercepted.
   */
  children?: React.ReactNode
  /**
   * The onRouteUpdate field is a callback function that will be executed every time an MSW Route is updated and reflected.
   * This allows the execution of a callback function whenever MSW handlers are updated.
   * @example
   * // React Query example
   * const queryClient = useQueryClient()
   *  return (
   *  <MSWDevtools
   *   onRouteUpdate={() => {
   *       queryClient.resetQueries()
   *    }}
   *  >
   *   <App />
   *  </MSWDevtools>
   * )
   */
  onRouteUpdate?: (routes: EnhancedDevtoolsRoute[]) => void
  /**
   * The initialOpen field is a boolean that determines whether the devtools panel should be open by default.
   * @default false
   */
  initialOpen?: boolean
  /**
   * The position field is a string that determines where the devtools panel should be positioned.
   */
  position?: Position
  /**
   * localStorage key to persist the state of the devtools panel.
   * @default "msw-devtools-state-key"
   */
  storageKey?: string
}

export type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right"
export type WorkerStatus = "enabled" | "disabled"
export type WorkerMode = "normal" | "error"
export type Origin = "msw" | "custom"

export type DevtoolsHandler = {
  id: string
  response: string
  status: number
  description: string
  headers?: Record<string, string>
  origin: Origin
}

export type DevtoolsRoute = {
  id: string
  url: string
  method: HttpMethods
  handlers: DevtoolsHandler[]
  selectedHandlerId: string
  delay: number | null
}

export type EnhancedDevtoolsRoute = DevtoolsRoute & {
  enabled?: boolean
  origin?: Origin
}
