import "@/shared/styles/global.css"
import { MSWDevtoolsProps } from "../types"
import { MswDevToolsProvider } from "@/providers/useMswDevtoolsContext"
import { MSWDevtoolsPanel } from "@/features/MSWDevtoolsPanel"

export const MSWDevtools = ({
  isEnabled = false,
  children,
  worker,
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
      <MswDevToolsProvider isEnabled={isEnabled} worker={worker}>
        <MSWDevtoolsPanel />
      </MswDevToolsProvider>
      {children}
    </>
  )
}
