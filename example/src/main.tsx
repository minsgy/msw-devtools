import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "./dist/index.css"
import { MSWDevtools } from "./dist"

const isDev = process.env.NODE_ENV === "development"
const prepareWorker = async () => {
  if (isDev) {
    const { worker } = await import("./mocks/browser")
    await worker.start()
    return worker
  }

  return undefined
}

prepareWorker().then((worker) =>
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <MSWDevtools
        worker={worker}
        isEnabled={isDev}
        apiUrl="https://example.com"
      >
        <App />
      </MSWDevtools>
    </React.StrictMode>
  )
)
