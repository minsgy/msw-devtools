"use client"

import { useState, useCallback, useEffect } from "react"
import { MswDevtoolsContextType } from "../providers/useMswDevtoolsContext"
import { EnhancedDevtoolsRoute } from ".."
import { generatorSerializedRouteHandlers } from "@/shared/utils/generatorSerializedRouteHandlers"
import { generatorRequestHandler } from "@/shared/utils/generatorRequestHandler"

export const useMswDevtoolsState = (initialState: MswDevtoolsContextType) => {
  const [state, setState] = useState(initialState)
  const [routes, setRoutes] = useState<EnhancedDevtoolsRoute[]>(
    generatorSerializedRouteHandlers(initialState.worker?.listHandlers() ?? [])
  )
  const setEnabled = useCallback((isEnabled: boolean) => {
    setState((prev) => ({
      ...prev,
      isEnabled,
    }))
  }, [])

  const onDeleteHandler = (id: string) => {
    setRoutes((route) => route.filter((route) => route.id !== id))
  }

  const onAddHandler = (route: EnhancedDevtoolsRoute) => {
    setRoutes((prev) => [...prev, route])
  }

  const onToggleHandler = (id: string, isSkip: boolean) => {
    const findIndex = routes.findIndex((route) => route.id === id)
    const newRoutes = [...routes]
    newRoutes[findIndex].isSkip = isSkip
    setRoutes(newRoutes)
  }

  useEffect(() => {
    if (state.worker) {
      const usedRoutes = routes.filter(({ isSkip }) => isSkip)
      state.worker.resetHandlers(...generatorRequestHandler(usedRoutes))
    }
  }, [routes, state.worker])

  return {
    state,
    setEnabled,
    routes,
    setRoutes,
    onDeleteHandler,
    onAddHandler,
    onToggleHandler,
  }
}
