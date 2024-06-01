import { http, HttpResponse } from "msw"

export const handlers = [
  http.get("https://api.example.com/user", () => {
    return HttpResponse.json({
      firstName: "John",
      lastName: "Maverick",
    })
  }),
  http.post("https://api.example.com/user", () => {
    return HttpResponse.json({ success: true })
  }),
  http.put("https://api.example.com/user/:id", () => {
    return HttpResponse.json({ success: true })
  }),
  http.delete("https://api.example.com/user/:id", () => {
    return HttpResponse.json({ success: true })
  }),
  http.patch("https://api.example.com/user/:id", () => {
    return HttpResponse.json({ success: true })
  }),
  http.options("https://api.example.com/user", () => {
    return HttpResponse.json({ success: true })
  }),
  http.head("https://api.example.com/user", () => {
    return HttpResponse.json({ success: true })
  }),
]
