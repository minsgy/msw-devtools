import { createdUuid } from "@/shared/utils/generatorSerializedRouteHandlers"
import { zodResolver } from "@hookform/resolvers/zod"
import { HttpMethods } from "msw"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getDefaultResponse } from "../utils/getDefaultResponse"
import { useEffect } from "react"
import { useRoute } from "@/providers/useMswDevtoolsContext"
import { useEditorPanelState } from "@/hooks/useEditorPanelState"
import { EnhancedDevtoolsRoute } from "@/types"
import { formattedJson } from "../utils/formattedJson"

export type CreateRouteFormValues = z.infer<typeof createRouteFormSchema>
export type CreateHandlerFormValues = z.infer<typeof createHandlerFormSchema>

const URL_REGEX = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm

const createHandlerFormSchema = z.object({
  response: z.string(),
  status: z.coerce.number(),
  description: z.string(),
  id: z.string().default(createdUuid()),
  origin: z.union([z.literal("msw"), z.literal("custom")]).default("custom"),
})

const createRouteFormSchema = z.object({
  id: z.string().default(createdUuid()),
  url: z
    .string()
    .refine(
      (url) => URL_REGEX.test(url ?? ""),
      "Invalid URL. Please a valid URL. Example: https://example.com/..."
    ),
  method: z.nativeEnum(HttpMethods),
  selectedHandlerId: z.string(),
  handlers: z.array(createHandlerFormSchema).min(1),
  delay: z.coerce.number(),
  description: z.string().optional(),
  enabled: z.boolean().default(true),
})

export const useCreateEditFormState = (
  selectedRoute: EnhancedDevtoolsRoute | null
) => {
  const defaultHandler = getDefaultResponse(0)
  const { onAddHandler } = useRoute()
  const { setIsOpenEditorPanel } = useEditorPanelState()
  const routeForm = useForm<CreateRouteFormValues>({
    resolver: zodResolver(createRouteFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      delay: 0,
      url: "",
      method: HttpMethods.GET,
      handlers: [defaultHandler],
      selectedHandlerId: defaultHandler.id,
    },
  })

  const handlerForm = useForm<CreateHandlerFormValues>({
    resolver: zodResolver(createHandlerFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultHandler,
  })

  const selectedHandlerId = routeForm.watch("selectedHandlerId")
  const selectedHandlerIndex =
    routeForm
      .getValues("handlers")
      .findIndex((handler) => handler.id === selectedHandlerId) ?? 0
  const selectedHandler = routeForm.getValues(
    `handlers.${selectedHandlerIndex}`
  )

  const handleRouteFormSubmit = (values: CreateRouteFormValues) => {
    onAddHandler(values)
    setIsOpenEditorPanel(false)
  }

  const handleHandlerFormSubmit = (values: CreateHandlerFormValues) => {
    routeForm.setValue(`handlers.${selectedHandlerIndex}`, values, {
      shouldValidate: true,
    })
  }

  useEffect(
    function setupHandlerForm() {
      if (!selectedHandlerId) {
        handlerForm.reset()
      } else {
        handlerForm.reset(selectedHandler)
      }
    },
    [selectedHandlerId]
  )

  useEffect(() => {
    async function setupInitialRoute() {
      if (selectedRoute !== null) {
        const formattedHandlers = await Promise.all(
          selectedRoute.handlers.map(async (handler) => ({
            ...handler,
            response: await formattedJson(handler.response),
          }))
        )
        routeForm.reset({
          ...selectedRoute,
          handlers: formattedHandlers,
          selectedHandlerId: selectedRoute?.selectedHandlerId,
          delay: selectedRoute?.delay ?? 0,
        })
      }
    }
    setupInitialRoute()
  }, [selectedRoute])

  return {
    routeForm,
    handlerForm,
    handleRouteFormSubmit,
    handleHandlerFormSubmit,
  }
}
