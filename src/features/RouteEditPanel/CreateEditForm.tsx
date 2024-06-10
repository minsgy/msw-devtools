import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/ui/select"
import { format } from "prettier"
import { ResponseJsonEditor } from "./ResponseJsonEditor"
import { StatusSelect } from "./StatusSelect"
import babel from "prettier/plugins/babel"
import prettierPluginEstree from "prettier/plugins/estree"
import { Separator } from "@/shared/ui/separator"
import { ROUTE_METHODS } from "@/constants"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { useCreateEditFormState } from "./hooks/useCreateEditFormState"
import { Plus } from "@/shared/icons"
import { getDefaultResponse } from "./utils/getDefaultResponse"

export const CreateEditForm = () => {
  const { routeForm, handleRouteFormSubmit } = useCreateEditFormState()

  const handlers = routeForm.watch("handlers")
  const selectedHandlerId = routeForm.watch("selectedHandlerId")
  const selectedHandlerIndex =
    handlers.findIndex((handler) => handler.id === selectedHandlerId) ?? 0

  return (
    <div className="overflow-y-auto scrollbar-hide">
      <Form {...routeForm}>
        <form
          onSubmit={routeForm.handleSubmit(handleRouteFormSubmit)}
          className="text-left"
        >
          <div className="flex py-[12px] px-[16px] space-x-2 items-end">
            <FormField
              control={routeForm.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Methods</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROUTE_METHODS.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
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
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                routeForm.setValue("handlers", [
                  ...handlers,
                  getDefaultResponse(handlers.length),
                ])
              }}
            >
              <Plus />
            </Button>
            <FormField
              control={routeForm.control}
              name="selectedHandlerId"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={handlers[0].id}
                    >
                      <SelectTrigger
                        className="flex-1"
                        placeholder="Select a handler"
                      >
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
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </div>
        </form>
        <Separator />
        <div className="flex py-[12px] px-[16px] space-x-2 text-left">
          <FormField
            control={routeForm.control}
            name={`handlers.${selectedHandlerIndex}.status`}
            render={({ field }) => {
              console.log(field.value, selectedHandlerIndex)
              return (
                <FormItem>
                  <FormLabel>Response Status</FormLabel>
                  <StatusSelect
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                  />
                </FormItem>
              )
            }}
          />
          <FormField
            control={routeForm.control}
            name={`handlers.${selectedHandlerIndex}.description`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="ex) userinfo get" {...field} />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <FormField
          control={routeForm.control}
          name={`handlers.${selectedHandlerIndex}.response`}
          render={({ field }) => (
            <FormItem className="py-[12px] px-[16px] text-left">
              <div className="flex justify-between w-full text-left py-[12px]">
                <FormLabel>Response Body</FormLabel>
                <FormMessage className="text-red-400" />
              </div>
              <FormControl>
                <ResponseJsonEditor
                  value={field.value}
                  onChange={(value) => {
                    console.log(value)
                    field.onChange(value)
                  }}
                  onSave={async () => {
                    try {
                      const formattedResponse = await format(field.value, {
                        tabWidth: 2,
                        printWidth: 100,
                        parser: "json5",
                        plugins: [babel, prettierPluginEstree],
                      })
                      // LINK: https://github.com/prettier/prettier/issues/6360
                      field.onChange(formattedResponse.replace(/[\r\n]+$/, ""))
                    } catch (error) {
                      const formattedError =
                        error instanceof Error ? error.message : "Unknown Error"
                      routeForm.setError(
                        `handlers.${selectedHandlerIndex}.response`,
                        {
                          message: formattedError,
                        }
                      )
                    }
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </div>
  )
}
