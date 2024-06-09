import { HttpResponse } from "msw"
import { http } from "msw-devtools"

export const handlers = [
  http
    .get("https://json-test.com/v1/user", () => {
      return HttpResponse.json({
        firstName: "zzz",
        lastName: "zzz",
      })
    })
    .presets([
      {
        status: 200,
        description: "Success",
        response: {
          firstName: "John",
          lastName: "Maverick",
        },
      },
      {
        status: 401,
        description: "Unauthorized",
        response: {
          error: "Unauthorized",
        },
      },
      {
        status: 404,
        description: "Not Found",
        response: {
          error: "Not Found",
        },
      },
    ]),
  http
    .post("https://json-test.com/v1/user", () => {
      return HttpResponse.json({
        firstName: "zzz",
        lastName: "zzz",
      })
    })
    .presets([
      {
        status: 200,
        description: "Success",
        response: {
          firstName: "John",
          lastName: "Maverick",
        },
      },
      {
        status: 401,
        description: "Unauthorized",
        response: {
          error: "Unauthorized",
        },
      },
      {
        status: 404,
        description: "Not Found",
        response: {
          error: "Not Found",
        },
      },
    ]),
  http
    .patch("https://json-test.com/v1/user", () => {
      return HttpResponse.json({
        firstName: "zzz",
        lastName: "zzz",
      })
    })
    .presets([
      {
        status: 200,
        description: "Success",
        response: {
          firstName: "John",
          lastName: "Maverick",
        },
      },
      {
        status: 401,
        description: "Unauthorized",
        response: {
          error: "Unauthorized",
        },
      },
      {
        status: 404,
        description: "Not Found",
        response: {
          error: "Not Found",
        },
      },
    ]),
  http
    .put("https://json-test.com/v1/user", () => {
      return HttpResponse.json({
        firstName: "zzz",
        lastName: "zzz",
      })
    })
    .presets([
      {
        status: 200,
        description: "Success",
        response: {
          firstName: "John",
          lastName: "Maverick",
        },
      },
      {
        status: 401,
        description: "Unauthorized",
        response: {
          error: "Unauthorized",
        },
      },
      {
        status: 404,
        description: "Not Found",
        response: {
          error: "Not Found",
        },
      },
    ]),
  http
    .put("https://json-test.com/v1/usertttt", () => {
      return HttpResponse.json({
        firstName: "zzz",
        lastName: "zzz",
      })
    })
    .presets([
      {
        status: 200,
        description: "Success",
        response: {
          firstName: "John",
          lastName: "Maverick",
        },
      },
      {
        status: 401,
        description: "Unauthorized",
        response: {
          error: "Unauthorized",
        },
      },
      {
        status: 404,
        description: "Not Found",
        response: {
          error: "Not Found",
        },
      },
    ]),
  http
    .put("https://json-test.com/v1/usertttttttttt", () => {
      return HttpResponse.json({
        firstName: "zzz",
        lastName: "zzz",
      })
    })
    .presets([
      {
        status: 200,
        description: "Success",
        response: {
          firstName: "John",
          lastName: "Maverick",
        },
      },
      {
        status: 401,
        description: "Unauthorized",
        response: {
          error: "Unauthorized",
        },
      },
      {
        status: 404,
        description: "Not Found",
        response: {
          error: "Not Found",
        },
      },
    ]),
]
