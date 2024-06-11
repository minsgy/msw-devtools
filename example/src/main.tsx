import { MSWDevtools } from "msw-devtools"
import "msw-devtools/styles"
import "react-json-view-lite/dist/index.css"

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "./index.css"

const isDev = process.env.NODE_ENV === "development"
const prepareWorker = async () => {
  if (isDev) {
    const { worker } = await import("./mocks/browser")
    await worker.start()
    return worker
  }

  return undefined
}

const queryClient = new QueryClient()
prepareWorker().then((worker) =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <MSWDevtools
          worker={worker}
          isEnabled={isDev}
          onRouteUpdate={() => {
            console.log("[MSW Devtools] Route updated")
            queryClient.resetQueries()
          }}>
          <App />
        </MSWDevtools>
      </QueryClientProvider>
    </React.StrictMode>
  )
)
