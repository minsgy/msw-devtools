import { FixedLayout } from "@/shared/ui/fixed-layout"
import { RouteEditPanel } from "./RouteEditPanel"
import { Separator } from "@/shared/ui/separator"
import { DevtoolsHandlerList } from "./DevtoolsHandlerList"
import { MswControllerHeader } from "./MswControllerHeader"
import { useEditorRouteState } from "@/providers/useMswDevtoolsContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { ScenarioPanel } from "./ScenarioPanel"
import { Button } from "@/shared/ui/button"
import { Close } from "@/shared/icons"

type MSWDevtoolsPanelProps = {
  onCloseDevtools: VoidFunction
}

export const MSWDevtoolsPanel = ({
  onCloseDevtools,
}: MSWDevtoolsPanelProps) => {
  const { isOpenEditorPanel } = useEditorRouteState()

  return (
    <FixedLayout>
      <Tabs defaultValue="routes" className="h-full">
        <div className="p-4 flex justify-between">
          <TabsList>
            <TabsTrigger value="routes">Routes</TabsTrigger>
            <TabsTrigger value="scenario">Scenario</TabsTrigger>
          </TabsList>
          <Button onClick={onCloseDevtools} variant="ghost">
            <Close />
          </Button>
        </div>
        <Separator />
        <TabsContent value="routes">
          {isOpenEditorPanel && <RouteEditPanel />}
          <MswControllerHeader />
          <Separator />
          <div className="p-[16px] h-full">
            <DevtoolsHandlerList />
          </div>
        </TabsContent>
        <TabsContent value="scenario">
          <ScenarioPanel />
        </TabsContent>
      </Tabs>
    </FixedLayout>
  )
}
