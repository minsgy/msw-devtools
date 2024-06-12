import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { StatusSelect } from "./StatusSelect"
import { ResponseJsonEditor } from "./ResponseJsonEditor"
import { useFormContext } from "react-hook-form"
import { CreateHandlerFormValues } from "./hooks/useCreateEditFormState"
import { Input } from "@/shared/ui/input"
import { Separator } from "@/shared/ui/separator"
import { Button } from "@/shared/ui/button"
import { formattedJson } from "./utils/formattedJson"
import { InlineCode } from "@/shared/ui/typography"

export const EditHandlerForm = () => {
  const handlerForm = useFormContext<CreateHandlerFormValues>()

  return (
    <>
      <div className="flex py-[12px] px-[16px] space-x-2 text-left items-end">
        <FormField
          control={handlerForm.control}
          name="status"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Response Status</FormLabel>
                <StatusSelect
                  value={String(field.value)}
                  onValueChange={field.onChange}
                  defaultValue={String(field.value)}
                />
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={handlerForm.control}
          name="description"
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
        <Button type="submit" variant="secondary">
          Handler Save
        </Button>
      </div>
      <Separator />
      <FormField
        control={handlerForm.control}
        name="response"
        render={({ field }) => (
          <FormItem className="py-[12px] px-[16px] text-left">
            <div className="flex justify-between w-full text-left py-[12px]">
              <FormLabel>Response Body</FormLabel>
              <FormMessage className="text-red-400" />
            </div>
            <FormControl>
              <ResponseJsonEditor
                value={field.value}
                onChange={field.onChange}
                onSave={async () => {
                  try {
                    const formattedResponse = await formattedJson(field.value)
                    field.onChange(formattedResponse)
                    handlerForm.clearErrors(`response`)
                  } catch (error) {
                    const formattedError =
                      error instanceof Error ? error.message : "Unknown Error"
                    handlerForm.setError(`response`, {
                      message: formattedError,
                    })
                  }
                }}
              />
            </FormControl>
            <FormDescription>
              You can use the <InlineCode>Ctrl + S</InlineCode> shortcut to save
              the JSON formatting.
            </FormDescription>
          </FormItem>
        )}
      />
    </>
  )
}
