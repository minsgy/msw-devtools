"use client"

import constate from "constate"
import { SetupWorker } from "msw/lib/browser"
import { useMswDevtoolsState } from "../hooks/useMswDevtoolsState"
import { useMswDevtoolsTabs } from "../hooks/useMswDevtoolsTabs"

export type MswDevtoolsContextType = {
  isEnabled: boolean
  worker?: SetupWorker
  apiUrl: string
}

const [
  MswDevToolsProvider,
  useApiUrlValue,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
  useTabIndex,
  useRoute,
] = constate(
  (initialState: MswDevtoolsContextType) => {
    const { state, setEnabled, route, setRoute } =
      useMswDevtoolsState(initialState)
    const { tab, handleTabChange } = useMswDevtoolsTabs()
    return { state, setEnabled, tab, handleTabChange, route, setRoute }
  },
  (value) => value.state.apiUrl,
  (value) => value.state.isEnabled,
  (value) => value.state.worker,
  (value) => value.setEnabled,
  (value) => ({ tab: value.tab, handleTabChange: value.handleTabChange }),
  (value) => ({ route: value.route, handleRouteChange: value.setRoute })
)

export {
  MswDevToolsProvider,
  useApiUrlValue,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
  useTabIndex,
  useRoute,
}
