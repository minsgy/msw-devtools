import { createdUuid } from "@/shared/utils/generatorSerializedRouteHandlers"
import { zodResolver } from "@hookform/resolvers/zod"
import { HttpMethods } from "msw"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getDefaultResponse } from "../utils/getDefaultResponse"

type CreateRouteFormValues = z.infer<typeof createRouteFormSchema>

const createHandlerFormSchema = z.object({
  response: z.string(),
  status: z.number(),
  description: z.string(),
  id: z.string().default(createdUuid()),
  origin: z.union([z.literal("msw"), z.literal("custom")]),
})

const createRouteFormSchema = z.object({
  id: z.string().default(createdUuid()),
  url: z.string(),
  method: z.string(),
  selectedHandlerId: z.string(),
  handlers: z.array(createHandlerFormSchema).min(1),
  delay: z.coerce.number(),
  description: z.string().optional(),
  enabled: z.boolean().default(true),
})

export const useCreateEditFormState = () => {
  const defaultHandler = getDefaultResponse(0)
  const routeForm = useForm<CreateRouteFormValues>({
    resolver: zodResolver(createRouteFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      delay: 0,
      url: "",
      method: HttpMethods.GET,
      handlers: [defaultHandler],
      selectedHandlerId: defaultHandler.id,
    },
  })

  const handleRouteFormSubmit = (values: CreateRouteFormValues) => {
    console.log(values)
  }

  return {
    routeForm,
    handleRouteFormSubmit,
  }
}
