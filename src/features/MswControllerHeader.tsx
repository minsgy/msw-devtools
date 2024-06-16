"use client"

import {
  useIsEnabledValue,
  useEnabledUpdate,
  useEditorRouteState,
} from "@/providers/useMswDevtoolsContext"
import { Button } from "@/shared/ui/button"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"

export const MswControllerHeader = () => {
  const isEnabled = useIsEnabledValue()
  const setEnabled = useEnabledUpdate()
  const { setIsOpenEditorPanel } = useEditorRouteState()

  return (
    <div className="flex items-center px-6 py-4 justify-between">
      <div className="flex items-center">
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
      <div className="flex">
        <Button
          variant="outline"
          onClick={() => {
            setIsOpenEditorPanel(true)
          }}>
          Add Route
        </Button>
      </div>
    </div>
  )
}
