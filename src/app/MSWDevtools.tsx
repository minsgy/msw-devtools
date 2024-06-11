import "@/shared/styles/global.css"
import { MSWDevtoolsProps } from "../types"
import { MswDevToolsProvider } from "@/providers/useMswDevtoolsContext"
import { MSWDevtoolsPanel } from "@/features/MSWDevtoolsPanel"

export const MSWDevtools = ({
  isEnabled = false,
  children,
  worker,
  onRouteUpdate,
  position,
  initialOpen = false,
}: MSWDevtoolsProps) => {
  if (isEnabled && !worker) {
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
        initialOpen={initialOpen}
        isEnabled={isEnabled}
        worker={worker}
        onRouteUpdate={onRouteUpdate}>
        <MSWDevtoolsPanel position={position} />
      </MswDevToolsProvider>
      {children}
    </>
  )
}
