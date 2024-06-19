"use client"

import { useState, useEffect, useRef } from "react"
import { MswDevtoolsContextType } from "../providers/useMswDevtoolsContext"
import { EnhancedDevtoolsRoute, ScenarioRoutePreset } from ".."
import { generatorSerializedRouteHandlers } from "@/shared/utils/generatorSerializedRouteHandlers"
import { generatorRequestHandler } from "@/shared/utils/generatorRequestHandler"

export const useMswDevtoolsState = ({
  onRouteUpdate,
  isEnabled: initialIsEnabled,
  worker,
}: MswDevtoolsContextType) => {
  const isMounted = useRef(false)
  const [isEnabled, setIsEnabled] = useState(initialIsEnabled ?? true)
  const [routes, setRoutes] = useState<EnhancedDevtoolsRoute[]>(
    generatorSerializedRouteHandlers(worker?.listHandlers() ?? [])
  )
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioRoutePreset | null>(null)

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

  const onUpdateHandler = (routeId: string, route: EnhancedDevtoolsRoute) => {
    const findIndex = routes.findIndex((route) => route.id === routeId)
    const newRoutes = [...routes]
    newRoutes[findIndex] = route
    setRoutes(newRoutes)
  }

  const onSelectScenario = (scenario: ScenarioRoutePreset | null) => {
    setSelectedScenario(scenario)
  }

  useEffect(
    function setupHandlers() {
      if (worker) {
        const httpUsedRoutes = generatorRequestHandler(routes)
        const selectedScenarioHandlers = selectedScenario?.handlers ?? []
        worker.resetHandlers(...httpUsedRoutes, ...selectedScenarioHandlers)
        if (isMounted.current) {
          onRouteUpdate?.(routes)
        } else {
          isMounted.current = true
        }
      }
    },
    [routes, worker, onRouteUpdate, selectedScenario]
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
    onUpdateHandler,
    onSelectScenario,
    selectedScenario,
  }
}
