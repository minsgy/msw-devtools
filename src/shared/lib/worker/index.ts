import {
  setupWorker as originSetupWorker,
  type SetupWorker as OriginSetupWorker,
} from "msw/browser"
import { RequestHandler } from "msw"
import type { Http } from "../http"

export type ScenarioRoutePreset = {
  scenarioName: string
  handlers: Array<ReturnType<Http[keyof Http]>>
  isEnabled?: boolean
}

export type SetupWorker = (
  ...handlers: Array<RequestHandler>
) => OriginSetupWorker & {
  /**
   * Add a scenario to the worker
   *
   */
  scenario: (scenarioRoutePreset: ScenarioRoutePreset[]) => void
  listScenarios: () => ScenarioRoutePreset[]
}

const setupWorker = new Proxy(originSetupWorker, {
  apply: (target, thisArg, argArray) => {
    const originWorker = Reflect.apply(target, thisArg, argArray)
    const scenarios: ScenarioRoutePreset[] = []
    originWorker.scenario = (scenario: ScenarioRoutePreset[]) => {
      scenarios.push(...scenario)
      return scenario
    }
    originWorker.listScenarios = () => {
      return scenarios
    }
    return originWorker
  },
}) as SetupWorker

export const createScenarioPreset = (
  scenarioRoutePreset: ScenarioRoutePreset[]
) => {
  return scenarioRoutePreset
}

export { setupWorker }
