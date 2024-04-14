import { useState } from "react"
import { MSWDevtoolsProps } from "../types"
import "../styles.scss"

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
      <div className="msw-devtools-wrapper">
        <div className="header">
          <h2>MSW Devtools</h2>
          <p>API URL: {apiUrl}</p>
          <p>Worker Status: {isReady ? "Ready" : "Not Ready"}</p>
        </div>
        <div className="inner">
          <button
            onClick={() => {
              setIsReady(true)
              worker.start()
            }}
          >
            Start Worker
          </button>
          <button
            onClick={() => {
              setIsReady(false)
              worker.stop()
            }}
          >
            Stop Worker
          </button>
        </div>
      </div>
      {children}
    </>
  )
}
