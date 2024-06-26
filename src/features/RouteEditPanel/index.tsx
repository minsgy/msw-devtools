import { H2 } from "@/shared/ui/typography"
import { Button } from "@/shared/ui/button"
import { Separator } from "@/shared/ui/separator"

import { CreateEditForm } from "./CreateEditForm"
import { useEditorRouteState } from "@/providers/useMswDevtoolsContext"
import { Close } from "@/shared/icons"

export const RouteEditPanel = () => {
  const { onCloseEditPanel } = useEditorRouteState()
  const { selectedRoute } = useEditorRouteState()

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex justify-between align-items px-[16px] py-[12px]">
        <H2>{selectedRoute ? "Edit" : "Create"} Route</H2>
        <Button
          variant="ghost"
          onClick={() => {
            onCloseEditPanel()
          }}>
          <Close />
        </Button>
      </header>
      <Separator />
      <CreateEditForm />
    </div>
  )
}
