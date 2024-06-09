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
import { InputContainer } from "@/shared/ui/input-container"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"

export const DevtoolsHandlerList = () => {
  const { routes, onToggleHandler, onSelectHandler } = useRoute()
  const { onOpenEditPanel } = useEditorRouteState()

  return (
    <ul className="list-none overflow-y-auto h-[250px] scrollbar-hide rounded-[4px] bg-transparent">
      <li className="p-[12px] flex items-center">
        <P className="font-semibold">Skip</P>
        <P className="font-semibold">Actions</P>
        <P className="font-semibold">Options</P>
      </li>
      {routes.map((route) => (
        <li key={route.id} className="p-[12px] flex items-center">
          <Switch
            checked={route.isSkip}
            onCheckedChange={(checked) => {
              onToggleHandler(route.id, checked)
            }}
          />
          <Label
            htmlFor={route.id}
            className="pl-[12px] flex items-center w-full"
          >
            <MethodTag method={route.method} />
            <span className="font-semibold">{route.url}</span>
            <div className="ml-auto flex items-center">
              <InputContainer label="delay" />
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
            </div>
          </Label>
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
