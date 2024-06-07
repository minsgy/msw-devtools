import { useState } from "react"
import { EnhancedDevtoolsRoute } from ".."

export const useEditorPanelState = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] =
    useState<EnhancedDevtoolsRoute | null>(null)

  const onOpenEditPanel = (route: EnhancedDevtoolsRoute | null) => {
    setSelectedRoute(route)
    setIsOpen(true)
  }

  const onCloseEditPanel = () => {
    setIsOpen(false)
    setSelectedRoute(null)
  }

  return {
    isOpenEditorPanel: isOpen,
    setIsOpenEditorPanel: setIsOpen,
    selectedRoute,
    onOpenEditPanel,
    onCloseEditPanel,
  }
}
