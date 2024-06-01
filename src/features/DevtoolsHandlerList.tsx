"use client"

import { match } from "ts-pattern"
import { Methods } from ".."
import { useWorkerValue } from "../providers/useMswDevtoolsContext"

import { cn } from "@/shared/lib/utils"
import { Checkbox } from "@/shared/ui/checkbox"
import { InlineCode } from "@/shared/ui/typography"
import { generatorSerializedRouteHandlers } from "@/shared/utils/generatorSerializedRouteHandlers"

export const DevtoolsHandlerList = () => {
  const worker = useWorkerValue()
  const handlers = worker?.listHandlers() ?? []
  const serializedHandlers = generatorSerializedRouteHandlers(handlers)

  return (
    <ul className="[&>li]:border-b-[1px] [&>li]:border-solid [&>li]:border-white list-none overflow-y-auto h-[250px] scrollbar-hide">
      {serializedHandlers.map((handler) => (
        <li key={handler.id} className="px-[6px] py-[12px] flex items-center">
          <Checkbox id={handler.id} />
          <label htmlFor={handler.id} className="pl-[12px]">
            <MethodTag method={handler.method} />
            <span className="ml-2 font-semibold">{handler.url}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export const MethodTag = ({ method }: { method: Methods }) => {
  const className = match(method)
    .with("GET", () => "text-red-500")
    .with("POST", () => "text-blue-500")
    .with("PUT", () => "text-green-500")
    .with("DELETE", () => "text-yellow-500")
    .with("PATCH", () => "text-purple-500")
    .otherwise(() => "text-white")

  return (
    <div className="inline-flex w-[100px] justify-center">
      <InlineCode className={cn("bg-slate-950 w-[80px]", className)}>
        {method}
      </InlineCode>
    </div>
  )
}
