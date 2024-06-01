"use client"

import { useState, useCallback } from "react"
import { MswDevtoolsContextType } from "../providers/useMswDevtoolsContext"

export const useMswDevtoolsState = (initialState: MswDevtoolsContextType) => {
  const [state, setState] = useState(initialState)
  const setEnabled = useCallback((isEnabled: boolean) => {
    setState((prev) => ({
      ...prev,
      isEnabled,
    }))
  }, [])

  return { state, setEnabled }
}
