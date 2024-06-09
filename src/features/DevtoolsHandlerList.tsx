"use client"

import { match } from "ts-pattern"

import { cn } from "@/shared/lib/cn"
import { InlineCode, P } from "@/shared/ui/typography"
import { HttpMethods } from "msw"
import {
  useEditorRouteState,
  useRoute,
} from "@/providers/useMswDevtoolsContext"
import { HandlerSelect } from "./HandlerSelect"
import { Button } from "@/shared/ui/button"
import { Switch } from "@/shared/ui/switch"
import { Input } from "@/shared/ui/input"

export const DevtoolsHandlerList = () => {
  const { routes, onToggleHandler, onSelectHandler } = useRoute()
  const { onOpenEditPanel } = useEditorRouteState()

  return (
    <ul className="list-none overflow-y-auto h-full scrollbar-hide rounded-[4px] bg-card">
      <li className="flex items-center max-[600px]:hidden text-gray-300 sticky top-0 z-10 h-[44px] bg-card">
        <P className="font-semibold w-[80px] shrink-0">METHODS</P>
        <P className="font-semibold pl-[12px] flex-1 text-left">URL</P>
        <P className="font-semibold flex-1 text-left">OPTIONS</P>
      </li>
      {routes.map((route) => (
        <li key={route.id} className="py-[12px] flex items-center">
          <div className="flex items-center w-full max-[600px]:flex-col max-[600px]:items-stretch">
            <div className="flex items-center flex-1">
              <MethodTag method={route.method} />
              <span className="flex-1 pl-[12px] font-semibold text-left break-word inline-block">
                {route.url}
              </span>
            </div>
            <div className="flex items-center max-[600px]:pt-[12px]">
              <div className="flex items-center w-[80px]">
                <Input />
                <span className="pl-[2px] text-gray-500">MS</span>
              </div>
              <HandlerSelect
                onValueChange={(handlerId) =>
                  onSelectHandler(route.id, handlerId)
                }
                options={route.handlers ?? []}
                defaultValue={route.handlers?.[0]?.id ?? undefined}
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
              <Switch
                checked={route.enabled}
                onCheckedChange={(checked) => {
                  onToggleHandler(route.id, checked)
                }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export const MethodTag = ({ method }: { method: HttpMethods }) => {
  const className = match(method)
    .with(HttpMethods.GET, () => "bg-red-500")
    .with(HttpMethods.POST, () => "bg-blue-500")
    .with(HttpMethods.PUT, () => "bg-green-500")
    .with(HttpMethods.DELETE, () => "bg-yellow-500")
    .with(HttpMethods.PATCH, () => "bg-purple-500")
    .otherwise(() => "bg-black")

  return (
    <div className="inline-flex justify-center basis-[80px] shrink-0">
      <InlineCode className={cn("text-white w-full", className)}>
        {method}
      </InlineCode>
    </div>
  )
}
