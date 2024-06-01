"use client"

import {
  useWorkerValue,
  useIsEnabledValue,
  useEnabledUpdate,
} from "@/providers/useMswDevtoolsContext"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"

import { useEffect } from "react"

export const MswControllerHeader = () => {
  const worker = useWorkerValue()
  const isEnabled = useIsEnabledValue()
  const setEnabled = useEnabledUpdate()

  useEffect(() => {
    if (isEnabled) {
      worker?.start()
    } else {
      worker?.stop()
    }
  }, [isEnabled])

  if (!worker) {
    return null
  }

  return (
    <div className="flex items-center px-6 py-4">
      <Switch
        id="terms"
        checked={isEnabled}
        onCheckedChange={(check) => {
          setEnabled(check)
        }}
      />
      <Label htmlFor="terms" className="pl-[8px] inline-flex font-semibold">
        Enable Mock Service Worker
      </Label>
    </div>
  )
}
