"use client"

import { useState, useCallback } from "react"
import { Tab } from ".."

export const useMswDevtoolsTabs = () => {
  const [tab, setTab] = useState<Tab>("handlers")
  const handleTabChange = useCallback((tab: Tab) => {
    setTab(tab)
  }, [])

  return { tab, handleTabChange }
}
