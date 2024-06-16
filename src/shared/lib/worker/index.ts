import {
  setupWorker as originSetupWorker,
  type SetupWorker as OriginSetupWorker,
} from "msw/browser"
import { RequestHandler } from "msw"
import { createdUuid } from "@/shared/utils/generatorSerializedRouteHandlers"
import { ScenarioRoutePreset } from "@/types"

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
    originWorker.scenario = (_scenarios: ScenarioRoutePreset[]) => {
      const newScenario = _scenarios.map(({ id, ...scenario }) => ({
        id: id ?? createdUuid(),
        ...scenario,
      }))

      scenarios.push(...newScenario)
      return newScenario
    }
    originWorker.listScenarios = () => {
      return scenarios
    }
    return originWorker
  },
}) as SetupWorker

export { setupWorker }
