import "@/shared/styles/global.css"
import { MSWDevtoolsProps } from "../types"
import { DevtoolsHandlerList } from "../features/DevtoolsHandlerList"
import { FixedLayout } from "../shared/ui/FixedLayout"
import { MswControllerHeader } from "../features/MswControllerHeader"
import { MswDevToolsProvider } from "@/providers/useMswDevtoolsContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Separator } from "@/shared/ui/separator"

export const MSWDevtools = ({
  isEnabled = false,
  children,
  worker,
  apiUrl,
}: MSWDevtoolsProps) => {
  if ((isEnabled && !worker) || (isEnabled && worker && !worker)) {
    console.warn(
      "worker is not defined. Please pass in a worker instance from setupWorker(...handlers)"
    )
  }

  if (!isEnabled || !worker) {
    return <>{children}</>
  }

  return (
    <>
      <MswDevToolsProvider
        isEnabled={isEnabled}
        apiUrl={apiUrl}
        worker={worker}
      >
        <FixedLayout>
          <MswControllerHeader />
          <Separator />
          <Tabs defaultValue="handlers">
            <TabsList className="w-fit">
              <TabsTrigger value="handlers">Handlers</TabsTrigger>
              <TabsTrigger value="config">Config</TabsTrigger>
            </TabsList>
            <TabsContent value="handlers">
              <div className="px-[16px]">
                <DevtoolsHandlerList />
              </div>
            </TabsContent>
          </Tabs>
        </FixedLayout>
      </MswDevToolsProvider>
      {children}
    </>
  )
}