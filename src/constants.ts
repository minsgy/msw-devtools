import { HttpMethods } from "msw"

export const ROUTE_METHODS = Object.values(HttpMethods)

export const MENU_TABS = ["handlers", "config"] as const
