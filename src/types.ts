import { SetupWorker } from "msw/lib/browser"
import { ComponentPropsWithoutRef } from "react"

export interface MSWDevtoolsProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * The base url of your requests. This is required to use 'error' mode as it takes the base domain and intercepts any request regardless of the path.
   */
  apiUrl: string
  /**
   * If the worker is not enabled, we won't ever load it and will just load children.
   */
  isEnabled?: boolean
  /**
   * An instance of the MSW worker returned from `setupWorker`.
   */
  worker?: SetupWorker
  /**
   * This component takes children so that it can ensure the worker has started before rendering the tree. This guarantees that
   * all requests will be intercepted.
   */
  children?: React.ReactNode
  /**
   * The position of the toolbar.
   * @default 'top'
   */
  position?: "top" | "bottom"
}

export type Setting = "mode" | "delay" | "status" | "isHidden"
export type WorkerStatus = "enabled" | "disabled"
export type WorkerMode = "normal" | "error"

export type Origin = "msw" | "custom"

export type DevToolsHandler = {
  id: string
  response: string
  status: number
  delay: number | null
  description: string
  headers?: Record<string, string>
  origin: Origin | string
}
export interface DevtoolsRoute {
  id: string
  url: string
  method: string
  handlers: DevToolsHandler[]
  selectedHandler?: string
}
