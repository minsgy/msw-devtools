// src/mocks/browser.js
import { http, setupWorker } from "msw-devtools"
import { handlers } from "./handlers"
import { HttpResponse } from "msw"

export const worker = setupWorker(...handlers)

worker.scenario([
  {
    description: "장바구니 상품 추가 시나리오",
    handlers: [
      http.get("https://jsonplaceholder.typicode.com/cart", () => {
        return HttpResponse.json({
          firstName: "111",
          lastName: "111",
        })
      }),
      http.post("https://jsonplaceholder.typicode.com/cart/1", () => {
        return HttpResponse.json({
          firstName: "222",
          lastName: "222",
        })
      }),
    ],
  },
  {
    description: "장바구니 상품 삭제 시나리오",
    handlers: [
      http.delete("https://jsonplaceholder.typicode.com/cart/1", () => {
        return HttpResponse.json({
          firstName: "333",
          lastName: "333",
        })
      }),
    ],
  },
])
