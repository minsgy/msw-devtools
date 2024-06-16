// src/mocks/browser.js
import { http, setupWorker } from "msw-devtools"
import { handlers } from "./handlers"
import { HttpResponse } from "msw"

export const worker = setupWorker(...handlers)

worker.scenario([
  {
    scenarioName: "test",
    handlers: [
      http.get("https://jsonplaceholder.typicode.com/todos/1", () => {
        return HttpResponse.json({
          firstName: "111",
          lastName: "111",
        })
      }),
      http.get("https://jsonplaceholder.typicode.com/todos/2", () => {
        return HttpResponse.json({
          firstName: "222",
          lastName: "222",
        })
      }),
    ],
    isEnabled: true,
  },
  {
    scenarioName: "test2",
    handlers: [
      http.get("https://jsonplaceholder.typicode.com/todos/3", () => {
        return HttpResponse.json({
          firstName: "333",
          lastName: "333",
        })
      }),
    ],
    isEnabled: false,
  },
])
