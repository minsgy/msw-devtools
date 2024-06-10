import { FixedLayout } from "@/shared/ui/fixed-layout"
import { RouteEditPanel } from "./RouteEditPanel"
import { Separator } from "@/shared/ui/separator"
import { DevtoolsHandlerList } from "./DevtoolsHandlerList"
import { MswControllerHeader } from "./MswControllerHeader"
import {
  useEditorRouteState,
  useFloatingState,
} from "@/providers/useMswDevtoolsContext"
import { DevtoolsFloatingButton } from "./DevtoolsFloatingButton"
import { Position } from ".."

type MSWDevtoolsPanelProps = {
  position?: Position
}

export const MSWDevtoolsPanel = ({
  position = "bottom-right",
}: MSWDevtoolsPanelProps) => {
  const { isOpenEditorPanel } = useEditorRouteState()
  const { isFloatingOpen, setIsFloatingOpen } = useFloatingState()

  return (
    <>
      {isFloatingOpen ? (
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
      ) : (
        <DevtoolsFloatingButton
          position={position}
          onClick={() => {
            setIsFloatingOpen(true)
          }}
        />
      )}
    </>
  )
}
