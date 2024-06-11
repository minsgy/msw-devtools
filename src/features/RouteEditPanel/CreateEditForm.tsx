import { Separator } from "@/shared/ui/separator"
import { Form } from "@/shared/ui/form"
import { useCreateEditFormState } from "./hooks/useCreateEditFormState"
import { EditHandlerForm } from "./EditHandlerForm"
import { EditRouteForm } from "./EditRouteForm"
import { EnhancedDevtoolsRoute } from "@/types"

type CreateEditFormProps = {
  selectedRoute: EnhancedDevtoolsRoute | null
}

export const CreateEditForm = ({ selectedRoute }: CreateEditFormProps) => {
  const {
    routeForm,
    handleRouteFormSubmit,
    handlerForm,
    handleHandlerFormSubmit,
  } = useCreateEditFormState(selectedRoute)

  return (
    <div className="overflow-y-auto scrollbar-hide">
      <Form {...routeForm}>
        <form
          onSubmit={routeForm.handleSubmit(handleRouteFormSubmit)}
          className="text-left">
          <EditRouteForm routeForm={routeForm} />
        </form>
      </Form>
      <Separator />
      <Form {...handlerForm}>
        <form onSubmit={handlerForm.handleSubmit(handleHandlerFormSubmit)}>
          <EditHandlerForm handlerForm={handlerForm} />
        </form>
      </Form>
    </div>
  )
}
