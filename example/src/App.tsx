import { useQuery } from "@tanstack/react-query"
import { JsonView, darkStyles } from "react-json-view-lite"
import "./App.css"
import { useState } from "react"

function App() {
  const [error, setError] = useState<string | null>(null)
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: async () => {
      try {
        const response = await fetch("https://json-test.com/v1/user")
        setError(null)
        return response.json()
      } catch (e) {
        const error = e as Error
        setError(error.message)
      }
    },
    gcTime: 0,
    staleTime: 0,
  })

  return (
    <>
      <div></div>
      <h1>MSW Devtools</h1>
      <div
        style={{
          textAlign: "left",
        }}
      >
        <JsonView style={darkStyles} data={data} />
        {error && (
          <p
            style={{
              color: "red",
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </>
  )
}

export default App
