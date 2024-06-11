"use client"

import { useState, useEffect, useRef } from "react"
import { MswDevtoolsContextType } from "../providers/useMswDevtoolsContext"
import { EnhancedDevtoolsRoute } from ".."
import { generatorSerializedRouteHandlers } from "@/shared/utils/generatorSerializedRouteHandlers"
import { generatorRequestHandler } from "@/shared/utils/generatorRequestHandler"

export const useMswDevtoolsState = ({
  onRouteUpdate,
  initialOpen,
  isEnabled: initialIsEnabled,
  worker,
}: MswDevtoolsContextType) => {
  const isMounted = useRef(false)
  const [isEnabled, setIsEnabled] = useState(initialIsEnabled ?? true)
  const [isFloatingOpen, setIsFloatingOpen] = useState(initialOpen ?? false)
  const [routes, setRoutes] = useState<EnhancedDevtoolsRoute[]>(
    generatorSerializedRouteHandlers(worker?.listHandlers() ?? [])
  )

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

  useEffect(
    function setupHandlers() {
      if (worker) {
        const httpUsedRoutes = generatorRequestHandler(routes)
        worker.resetHandlers(...httpUsedRoutes)
        // first call is not needed
        if (isMounted.current) {
          onRouteUpdate?.(routes)
        } else {
          isMounted.current = true
        }
      }
    },
    [routes, worker, onRouteUpdate]
  )

  useEffect(
    function setupWorkerEnabled() {
      if (isEnabled) {
        worker.start()
      } else {
        worker.stop()
      }
    },
    [isEnabled, worker]
  )

  return {
    worker,
    isEnabled,
    setIsEnabled,
    routes,
    setRoutes,
    onDeleteHandler,
    onAddHandler,
    onToggleHandler,
    onSelectHandler,
    isFloatingOpen,
    setIsFloatingOpen,
  }
}
