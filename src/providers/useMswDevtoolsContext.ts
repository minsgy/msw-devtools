"use client"

import constate from "constate"
import { useMswDevtoolsState } from "../hooks/useMswDevtoolsState"
import { useEditorPanelState } from "@/hooks/useEditorPanelState"
import { MSWDevtoolsProps } from ".."

export type MswDevtoolsContextType = Omit<
  MSWDevtoolsProps,
  "children" | "position"
>

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
      onSelectHandler,
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
      onSelectHandler,
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
    onSelectHandler: value.onSelectHandler,
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
