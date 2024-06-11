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
  useFloatingState,
  useEnabledUpdate,
  useRoute,
  useEditorRouteState,
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
      isFloatingOpen,
      isEnabled,
      setIsFloatingOpen,
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
      isFloatingOpen,
      setIsFloatingOpen,
      onUpdateHandler,
      isEnabled,
    }
  },
  (value) => value.isEnabled,
  (value) => value.worker,
  (value) => ({
    isFloatingOpen: value.isFloatingOpen,
    setIsFloatingOpen: value.setIsFloatingOpen,
  }),
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
  })
)

export {
  MswDevToolsProvider,
  useIsEnabledValue,
  useWorkerValue,
  useEnabledUpdate,
  useRoute,
  useEditorRouteState,
  useFloatingState,
}
