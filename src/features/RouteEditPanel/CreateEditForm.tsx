import { Separator } from "@/shared/ui/separator"
import { Form } from "@/shared/ui/form"
import { useCreateEditFormState } from "./hooks/useCreateEditFormState"
import { EditHandlerForm } from "./EditHandlerForm"
import { EditRouteForm } from "./EditRouteForm"

export const CreateEditForm = () => {
  const {
    routeForm,
    handleRouteFormSubmit,
    handlerForm,
    handleHandlerFormSubmit,
  } = useCreateEditFormState()

  return (
    <div className="overflow-y-auto scrollbar-hide">
      <Form {...routeForm}>
        <form
          onSubmit={routeForm.handleSubmit(handleRouteFormSubmit)}
          className="text-left">
          <EditRouteForm />
        </form>
      </Form>
      <Separator />
      <Form {...handlerForm}>
        <form onSubmit={handlerForm.handleSubmit(handleHandlerFormSubmit)}>
          <EditHandlerForm />
        </form>
      </Form>
    </div>
  )
}
