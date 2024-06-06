import { RequestHandler } from "msw"
import { createHandler } from "./createHandler"
import { EnhancedDevtoolsRoute } from "@/types"

export const generatorRequestHandler = (
  routes: EnhancedDevtoolsRoute[]
): RequestHandler[] => {
  return routes
    .map((route) => createHandler(route))
    .filter((route): route is NonNullable<typeof route> => !!route)
}
