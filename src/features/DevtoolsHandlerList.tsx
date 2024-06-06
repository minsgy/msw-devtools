"use client"

import { match } from "ts-pattern"

import { cn } from "@/shared/lib/cn"
import { Checkbox } from "@/shared/ui/checkbox"
import { InlineCode, P } from "@/shared/ui/typography"
import { HttpMethods } from "msw"
import {
  useEditorRouteState,
  useRoute,
} from "@/providers/useMswDevtoolsContext"
import { HandlerSelect } from "./HandlerSelect"
import { Button } from "@/shared/ui/button"

export const DevtoolsHandlerList = () => {
  const { routes, onToggleHandler } = useRoute()
  const { onOpenEditPanel } = useEditorRouteState()

  return (
    <ul className=" list-none overflow-y-auto h-[250px] scrollbar-hide bg-secondary rounded-[4px]">
      {routes.map((route) => (
        <li key={route.id} className="p-[12px] flex items-center">
          <Checkbox
            id={route.id}
            checked={route.isSkip}
            onCheckedChange={(checked) => {
              onToggleHandler(route.id)
            }}
          />
          <label
            htmlFor={route.id}
            className="pl-[12px] flex items-center w-full"
          >
            <MethodTag method={route.method} />
            <span className="font-semibold">{route.url}</span>
            <div className="ml-auto flex items-center">
              <HandlerSelect
                options={route.handlers}
                defaultValue={route.handlers[0].id}
              />
              <Button
                className="ml-[12px]"
                variant="ghost"
                onClick={() => {
                  onOpenEditPanel(route)
                }}
              >
                Edit
              </Button>
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
