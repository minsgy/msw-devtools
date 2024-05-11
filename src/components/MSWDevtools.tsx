import "../styles/global.css"
import { useState } from "react"
import { MSWDevtoolsProps } from "../types"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { H3, P } from "./ui/typography"
import { MswDevToolsProvider } from "@/hooks/useMswDevtoolsContext"
import { DevtoolsHandlers } from "./DevtoolsHandlers"

export const MSWDevtools = ({
  isEnabled = false,
  children,
  worker,
  apiUrl,
}: MSWDevtoolsProps) => {
  const [isReady, setIsReady] = useState(isEnabled)

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
        <Card className="absolute bottom-[20px] right-[20px] p-[20px]">
          <CardHeader>
            <H3>MSW Devtools</H3>
          </CardHeader>
          <CardContent>
            <P>API URL: {apiUrl}</P>
            <P>Worker Status: {isReady ? "Ready" : "Not Ready"}</P>
            <DevtoolsHandlers />
          </CardContent>
          <CardFooter>
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setIsReady(true)
                  worker.start()
                }}
              >
                Start Worker
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsReady(false)
                  worker.stop()
                }}
              >
                Stop Worker
              </Button>
            </div>
          </CardFooter>
        </Card>
      </MswDevToolsProvider>
      {children}
    </>
  )
}
