"use client"

import { match } from "ts-pattern"

import { cn } from "@/shared/lib/utils"
import { Checkbox } from "@/shared/ui/checkbox"
import { InlineCode } from "@/shared/ui/typography"
import { StatusSelect } from "./StatusSelect"
import { HttpMethods } from "msw"
import { useRoute } from "@/providers/useMswDevtoolsContext"

export const DevtoolsHandlerList = () => {
  const { route } = useRoute()

  return (
    <ul className="[&>li]:border-b-[1px] [&>li]:border-solid [&>li]:border-white list-none overflow-y-auto h-[250px] scrollbar-hide">
      {route.map((handler) => (
        <li key={handler.id} className="px-[6px] py-[12px] flex items-center">
          <Checkbox id={handler.id} checked={handler.isUsed} />
          <label
            htmlFor={handler.id}
            className="pl-[12px] flex items-center w-full"
          >
            <MethodTag method={handler.method} />
            <span className="font-semibold">{handler.url}</span>
            <div className="ml-auto">
              <StatusSelect />
            </div>
          </label>
        </li>
      ))}
    </ul>
  )
}

export const MethodTag = ({ method }: { method: HttpMethods }) => {
  const className = match(method)
    .with(HttpMethods.GET, () => "text-red-500")
    .with(HttpMethods.POST, () => "text-blue-500")
    .with(HttpMethods.PUT, () => "text-green-500")
    .with(HttpMethods.DELETE, () => "text-yellow-500")
    .with(HttpMethods.PATCH, () => "text-purple-500")
    .otherwise(() => "text-white")

  return (
    <div className="inline-flex w-[100px] justify-center">
      <InlineCode className={cn("bg-slate-950 w-[80px]", className)}>
        {method}
      </InlineCode>
    </div>
  )
}
