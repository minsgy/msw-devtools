import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { H4, P } from "@/shared/ui/typography"
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
import { Controller, useForm } from "react-hook-form"
import { HttpMethods } from "msw"
import { ROUTE_METHODS } from "@/constants"

type CreateEditFormValues = {
  delay?: string
  description?: string
  method: HttpMethods
  url: string
  status: string
  response: string
}

export const CreateEditForm = () => {
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateEditFormValues>({
    defaultValues: {
      method: HttpMethods.GET,
      url: "",
      status: "200",
      response: "{}",
    },
  })

  return (
    <form
      onSubmit={handleSubmit((value) => {
        console.log(value)
      })}
    >
      <div className="flex py-[12px] px-[16px]">
        <Controller
          control={control}
          name="method"
          render={({ field }) => (
            <Select defaultValue={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {ROUTE_METHODS.map((method) => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Input
          placeholder="Route URL https://example.com/..."
          {...register("url")}
        />
        <Button type="submit">Save</Button>
      </div>
      <Separator />
      <div className="flex py-[12px] px-[16px]">
        <StatusSelect defaultValue={"200"} />
        <Input placeholder="Description" {...register("description")} />
        <Input placeholder="delay" {...register("delay")} />
      </div>
      <Separator />
      <div className="flex justify-between w-full text-left py-[12px] px-[16px]">
        <H4>Response Body</H4>
        {errors.response && (
          <P className="text-red-500">{errors.response.message}</P>
        )}
      </div>
      <div className="py-[12px] px-[16px] text-left">
        <Controller
          control={control}
          name="response"
          render={({ field }) => (
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
                  setError("response", {
                    message: formattedError,
                  })
                }
              }}
            />
          )}
        />
      </div>
    </form>
  )
}
