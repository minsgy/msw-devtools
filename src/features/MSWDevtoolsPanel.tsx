import { FixedLayout } from "@/shared/ui/FixedLayout"
import { RouteEditPanel } from "./RouteEditPanel"
import { Separator } from "@/shared/ui/separator"
import { DevtoolsHandlerList } from "./DevtoolsHandlerList"
import { MswControllerHeader } from "./MswControllerHeader"
import { useEditorRouteState } from "@/providers/useMswDevtoolsContext"

export const MSWDevtoolsPanel = () => {
  const { isOpenEditorPanel } = useEditorRouteState()

  return (
    <FixedLayout>
      {isOpenEditorPanel ? (
        <RouteEditPanel />
      ) : (
        <>
          <MswControllerHeader />
          <Separator />
          <div className="p-[16px]">
            <DevtoolsHandlerList />
          </div>
        </>
      )}
    </FixedLayout>
  )
}
