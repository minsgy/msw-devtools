"use client"

import { useState, useCallback, useEffect } from "react"
import { MswDevtoolsContextType } from "../providers/useMswDevtoolsContext"
import { EnhancedDevtoolsRoute } from ".."
import { generatorSerializedRouteHandlers } from "@/shared/utils/generatorSerializedRouteHandlers"

export const useMswDevtoolsState = (initialState: MswDevtoolsContextType) => {
  const [state, setState] = useState(initialState)
  const [route, setRoute] = useState<EnhancedDevtoolsRoute[]>(
    generatorSerializedRouteHandlers(initialState.worker?.listHandlers() ?? [])
  )
  const setEnabled = useCallback((isEnabled: boolean) => {
    setState((prev) => ({
      ...prev,
      isEnabled,
    }))
  }, [])

  return { state, setEnabled, route, setRoute }
}
