import { ROUTE_METHODS } from "@/constants"
import { Plus } from "@/shared/icons"
import { Button } from "@/shared/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Separator } from "@/shared/ui/separator"
import { useFormContext } from "react-hook-form"
import { CreateRouteFormValues } from "./hooks/useCreateEditFormState"
import { getDefaultResponse } from "./utils/getDefaultResponse"
import { useEffect, useState } from "react"
import { match } from "ts-pattern"

export const EditRouteForm = () => {
  const [selectedHandlerId, setSelectedHandlerId] = useState("")
  const routeForm = useFormContext<CreateRouteFormValues>()
  const handlers = routeForm.watch("handlers")
  const handleAddHandler = () => {
    const defaultHandler = getDefaultResponse(handlers.length)
    routeForm.setValue("handlers", [...handlers, defaultHandler])
  }

  useEffect(() => {
    if (handlers.length === 0) return
    const selectedHandlerId = match(handlers.length)
      .with(1, () => handlers[0]?.id)
      .otherwise(() => handlers[handlers.length - 1]?.id)
    setSelectedHandlerId(selectedHandlerId)
    routeForm.setValue("temporarySelectedHandlerId", selectedHandlerId, {
      shouldValidate: true,
    })
  }, [handlers, setSelectedHandlerId])

  return (
    <>
      <div className="flex py-[12px] px-[16px] space-x-2 items-end">
        <FormField
          control={routeForm.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Methods</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
                value={field.value}>
                <FormControl>
                  <SelectTrigger className="min-w-[60px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ROUTE_METHODS.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={routeForm.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/..." {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={routeForm.control}
          name="delay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delay(ms)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </div>
      <Separator />
      <div className="flex py-[12px] px-[16px] space-x-2 text-left">
        <Button type="button" variant="outline" onClick={handleAddHandler}>
          <Plus />
        </Button>
        <FormItem className="flex-1">
          <Select
            onValueChange={(value) => {
              routeForm.setValue("temporarySelectedHandlerId", value)
              setSelectedHandlerId(value)
            }}
            value={selectedHandlerId}
            defaultValue={handlers[0]?.id}>
            <SelectTrigger className="flex-1" placeholder="Select a handler">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {handlers.map(({ status, description, id }) => (
                <SelectItem key={id} value={id}>
                  {status} - {description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      </div>
    </>
  )
}
