"use client"

import constate from "constate"
import { SetupWorker } from "msw/lib/browser"
import { useMswDevtoolsState } from "../hooks/useMswDevtoolsState"
import { useEditorPanelState } from "@/hooks/useEditorPanelState"

export type MswDevtoolsContextType = {
  isEnabled: boolean
  worker?: SetupWorker
}

const [
  MswDevToolsProvider,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
  useRoute,
  useEditorRouteState,
] = constate(
  (initialState: MswDevtoolsContextType) => {
    const {
      state,
      setEnabled,
      routes,
      setRoutes,
      onAddHandler,
      onDeleteHandler,
      onToggleHandler,
    } = useMswDevtoolsState(initialState)
    const {
      selectedRoute,
      onOpenEditPanel,
      setIsOpenEditorPanel,
      isOpenEditorPanel,
      onCloseEditPanel,
    } = useEditorPanelState()

    return {
      state,
      setEnabled,
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
    }
  },
  (value) => value.state.isEnabled,
  (value) => value.state.worker,
  (value) => value.setEnabled,
  (value) => ({
    routes: value.routes,
    onRoutesChange: value.setRoutes,
    onDeleteHandler: value.onDeleteHandler,
    onAddHandler: value.onAddHandler,
    onToggleHandler: value.onToggleHandler,
  }),
  (value) => ({
    selectedRoute: value.selectedRoute,
    onOpenEditPanel: value.onOpenEditPanel,
    isOpenEditorPanel: value.isOpenEditorPanel,
    setIsOpenEditorPanel: value.setIsOpenEditorPanel,
    onCloseEditPanel: value.onCloseEditPanel,
  })
)

export {
  MswDevToolsProvider,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
  useRoute,
  useEditorRouteState,
}
