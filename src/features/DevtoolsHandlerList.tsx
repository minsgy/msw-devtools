"use client"

import { match } from "ts-pattern"

import { cn } from "@/shared/lib/cn"
import { InlineCode } from "@/shared/ui/typography"
import { HttpMethods } from "msw"
import {
  useEditorRouteState,
  useIsEnabledValue,
  useRoute,
} from "@/providers/useMswDevtoolsContext"
import { HandlerSelect } from "./HandlerSelect"
import { Button } from "@/shared/ui/button"
import { Switch } from "@/shared/ui/switch"
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/shared/ui/table"
import { Edit } from "@/shared/icons"

export const DevtoolsHandlerList = () => {
  const isEnabled = useIsEnabledValue()
  const { routes, onToggleHandler, onSelectHandler } = useRoute()
  const { onOpenEditPanel } = useEditorRouteState()

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Methods</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Options</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {routes.map((route) => (
          <TableRow key={route.id} className="py-[16px]">
            <TableCell>
              <MethodTag method={route.method} />
            </TableCell>
            <TableCell>
              <span className="flex-1 pl-[12px] font-semibold text-left break-word inline-block">
                {route.url}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <HandlerSelect
                  onValueChange={(handlerId) =>
                    onSelectHandler(route.id, handlerId)
                  }
                  options={route.handlers}
                  defaultValue={route.handlers?.[0]?.id ?? undefined}
                />
                {route.origin === "custom" && (
                  <InlineCode>{route.origin}</InlineCode>
                )}
                <div className="flex space-x-2 ml-auto items-center">
                  <Button
                    className="ml-[12px]"
                    variant="ghost"
                    onClick={() => {
                      onOpenEditPanel(route)
                    }}>
                    <Edit />
                  </Button>
                  <Switch
                    disabled={!isEnabled}
                    checked={route.enabled}
                    onCheckedChange={(checked) => {
                      onToggleHandler(route.id, checked)
                    }}
                  />
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
    <div className="inline-flex justify-center w-full shrink-0">
      <InlineCode className={cn("text-white w-full", className)}>
        {method}
      </InlineCode>
    </div>
  )
}
