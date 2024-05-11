import { useCallback, useState } from "react"
import constate from "constate"
import { SetupWorker } from "msw/lib/browser"

type MswDevtoolsContextType = {
  isEnabled: boolean
  worker?: SetupWorker
  apiUrl: string
}

const useMswDevtools = (initialState: MswDevtoolsContextType) => {
  const [state, setState] = useState(initialState)
  const setEnabled = useCallback((isEnabled: boolean) => {
    setState((prev) => ({
      ...prev,
      isEnabled,
    }))
  }, [])

  return {
    state,
    setEnabled,
  }
}

const [
  MswDevToolsProvider,
  useApiUrlValue,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
] = constate(
  useMswDevtools,
  (value) => value.state.apiUrl,
  (value) => value.state.isEnabled,
  (value) => value.state.worker,
  (value) => value.setEnabled
)
export {
  MswDevToolsProvider,
  useApiUrlValue,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
}
