"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { MswDevtoolsContextType } from "../providers/useMswDevtoolsContext"
import { EnhancedDevtoolsRoute } from ".."
import { generatorSerializedRouteHandlers } from "@/shared/utils/generatorSerializedRouteHandlers"
import { generatorRequestHandler } from "@/shared/utils/generatorRequestHandler"

export const useMswDevtoolsState = ({
  onRouteUpdate,
  ...initialState
}: MswDevtoolsContextType) => {
  const isMounted = useRef(false)
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

  const onToggleHandler = (id: string, enabled: boolean) => {
    const findIndex = routes.findIndex((route) => route.id === id)
    const newRoutes = [...routes]
    newRoutes[findIndex].enabled = enabled
    setRoutes(newRoutes)
  }

  const onSelectHandler = (routeId: string, selectedHandlerId: string) => {
    const findIndex = routes.findIndex((route) => route.id === routeId)
    const newRoutes = [...routes]
    newRoutes[findIndex].selectedHandlerId = selectedHandlerId
    setRoutes(newRoutes)
  }

  useEffect(() => {
    if (state.worker) {
      const httpUsedRoutes = generatorRequestHandler(routes)
      state.worker.resetHandlers(...httpUsedRoutes)
      // first call is not needed
      if (isMounted.current) {
        onRouteUpdate?.(routes)
      } else {
        isMounted.current = true
      }
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
    onSelectHandler,
  }
}
