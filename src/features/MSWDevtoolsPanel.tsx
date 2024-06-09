import { FixedLayout } from "@/shared/ui/fixed-layout"
import { RouteEditPanel } from "./RouteEditPanel"
import { Separator } from "@/shared/ui/separator"
import { DevtoolsHandlerList } from "./DevtoolsHandlerList"
import { MswControllerHeader } from "./MswControllerHeader"
import { useEditorRouteState } from "@/providers/useMswDevtoolsContext"
import { DevtoolsButton } from "./DevtoolsButton"

export const MSWDevtoolsPanel = () => {
  const { isOpenEditorPanel } = useEditorRouteState()

  return (
    <>
      <DevtoolsButton position="bottom-right" />
      <FixedLayout>
        {isOpenEditorPanel ? (
          <RouteEditPanel />
        ) : (
          <>
            <MswControllerHeader />
            <Separator />
            <div className="p-[16px] h-full">
              <DevtoolsHandlerList />
            </div>
          </>
        )}
      </FixedLayout>
    </>
  )
}
