"use client"

import constate from "constate"
import { useMswDevtoolsState } from "../hooks/useMswDevtoolsState"
import { useEditorPanelState } from "@/hooks/useEditorPanelState"
import { MSWDevtoolsProps, SetupWorker } from ".."

export type MswDevtoolsContextType = Omit<
  MSWDevtoolsProps,
  "children" | "worker"
> & {
  worker: ReturnType<SetupWorker>
}

const [
  MswDevToolsProvider,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
  useRoute,
  useEditorRouteState,
  useScenarioState,
] = constate(
  (initialState: MswDevtoolsContextType) => {
    const {
      worker,
      setIsEnabled,
      routes,
      setRoutes,
      onAddHandler,
      onDeleteHandler,
      onToggleHandler,
      onSelectHandler,
      onUpdateHandler,
      selectedScenario,
      onSelectScenario,
      isEnabled,
    } = useMswDevtoolsState(initialState)
    const {
      selectedRoute,
      onOpenEditPanel,
      setIsOpenEditorPanel,
      isOpenEditorPanel,
      onCloseEditPanel,
    } = useEditorPanelState()

    return {
      worker,
      setIsEnabled,
      routes,
      setRoutes,
      onAddHandler,
      onDeleteHandler,
      onToggleHandler,
      selectedRoute,
      onOpenEditPanel,
      setIsOpenEditorPanel,
      isOpenEditorPanel,
      onCloseEditPanel,
      onSelectHandler,
      onUpdateHandler,
      isEnabled,
      selectedScenario,
      onSelectScenario,
    }
  },
  (value) => value.isEnabled,
  (value) => value.worker,
  (value) => value.setIsEnabled,
  (value) => ({
    routes: value.routes,
    onRoutesChange: value.setRoutes,
    onUpdateHandler: value.onUpdateHandler,
    onDeleteHandler: value.onDeleteHandler,
    onAddHandler: value.onAddHandler,
    onToggleHandler: value.onToggleHandler,
    onSelectHandler: value.onSelectHandler,
  }),
  (value) => ({
    selectedRoute: value.selectedRoute,
    onOpenEditPanel: value.onOpenEditPanel,
    isOpenEditorPanel: value.isOpenEditorPanel,
    setIsOpenEditorPanel: value.setIsOpenEditorPanel,
    onCloseEditPanel: value.onCloseEditPanel,
  }),
  (value) => ({
    selectedScenario: value.selectedScenario,
    onSelectScenario: value.onSelectScenario,
  })
)

export {
  MswDevToolsProvider,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
  useRoute,
  useEditorRouteState,
  useScenarioState,
}
