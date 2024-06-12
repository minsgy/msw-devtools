import { createdUuid } from "@/shared/utils/generatorSerializedRouteHandlers"
import { zodResolver } from "@hookform/resolvers/zod"
import { HttpMethods } from "msw"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getDefaultResponse } from "../utils/getDefaultResponse"
import { useEffect } from "react"
import {
  useEditorRouteState,
  useRoute,
} from "@/providers/useMswDevtoolsContext"
import { formattedJson } from "../utils/formattedJson"

export type CreateRouteFormValues = z.infer<typeof createRouteFormSchema>
export type CreateHandlerFormValues = z.infer<typeof createHandlerFormSchema>

const createHandlerFormSchema = z.object({
  response: z.string(),
  status: z.coerce.number(),
  description: z.string(),
  id: z.string().default(createdUuid()),
  origin: z.union([z.literal("msw"), z.literal("custom")]).default("custom"),
})

const createRouteFormSchema = z.object({
  id: z.string().default(createdUuid()),
  // TODO: URL pattern that the route should match.
  url: z.string(),
  method: z.nativeEnum(HttpMethods),
  selectedHandlerId: z.string(),
  handlers: z.array(createHandlerFormSchema).min(1),
  delay: z.coerce.number(),
  description: z.string().optional(),
  enabled: z.boolean().default(true),
  origin: z.union([z.literal("msw"), z.literal("custom")]).default("custom"),
  temporarySelectedHandlerId: z.string(),
})

export const useCreateEditFormState = () => {
  const defaultHandler = getDefaultResponse(0)
  const { selectedRoute, onCloseEditPanel } = useEditorRouteState()
  const { onAddHandler, onUpdateHandler } = useRoute()
  const routeForm = useForm<CreateRouteFormValues>({
    resolver: zodResolver(createRouteFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldUnregister: false,
    defaultValues: {
      delay: 0,
      url: "",
      method: HttpMethods.GET,
      handlers: [defaultHandler],
      selectedHandlerId: defaultHandler.id,
      temporarySelectedHandlerId: defaultHandler.id,
    },
  })

  const handlerForm = useForm<CreateHandlerFormValues>({
    resolver: zodResolver(createHandlerFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultHandler,
  })

  const temporarySelectedHandlerId = routeForm.watch(
    "temporarySelectedHandlerId"
  )
  const selectedHandlerIndex = routeForm
    .getValues("handlers")
    .findIndex((handler) => handler.id === temporarySelectedHandlerId)
  const selectedHandler = routeForm.watch(`handlers.${selectedHandlerIndex}`)

  const handleRouteFormSubmit = (values: CreateRouteFormValues) => {
    if (selectedRoute === null) {
      onAddHandler(values)
    } else {
      console.log("selectedRoute.id", selectedRoute.id, values)
      onUpdateHandler(selectedRoute.id, values)
    }
    onCloseEditPanel()
  }

  const handleHandlerFormSubmit = (values: CreateHandlerFormValues) => {
    routeForm.setValue(`handlers.${selectedHandlerIndex}`, values, {
      shouldValidate: true,
    })
  }

  useEffect(
    function setupHandlerForm() {
      if (selectedHandlerIndex === -1) return
      handlerForm.reset(selectedHandler)
    },
    [selectedHandlerIndex, selectedHandler]
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
          temporarySelectedHandlerId: formattedHandlers[0].id,
        })
      }
    }
    setupInitialRoute()
  }, [selectedRoute])

  return {
    routeForm,
    selectedHandler,
    handlerForm,
    handleRouteFormSubmit,
    handleHandlerFormSubmit,
  }
}
