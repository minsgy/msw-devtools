import {
  useIsEnabledValue,
  useScenarioState,
  useWorkerValue,
} from "@/providers/useMswDevtoolsContext"
import { Separator } from "@/shared/ui/separator"
import { InlineCode, P } from "@/shared/ui/typography"
import { generatorSerializedRouteHandlers } from "@/shared/utils/generatorSerializedRouteHandlers"
import { TableRow, TableBody, TableCell, Table } from "@/shared/ui/table"
import { MethodTag } from "../DevtoolsHandlerList"

import { Switch } from "@/shared/ui/switch"
import { Fragment } from "react"
import { HandlerSelect } from "../HandlerSelect"
import { Toggle } from "@/shared/ui/toggle"
import { Check } from "@/shared/icons"
import { ScenarioRoutePreset } from "@/types"
export const ScenarioPanel = () => {
  const isEnabled = useIsEnabledValue()
  const { listScenarios } = useWorkerValue()
  const { selectedScenario, onSelectScenario } = useScenarioState()

  const handleToggleScenario = (
    scenario: ScenarioRoutePreset,
    isPressed: boolean
  ) => {
    if (!isPressed) {
      onSelectScenario(null)
      return
    }

    onSelectScenario(scenario)
  }

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex justify-between align-items px-[16px] py-[12px]">
        <P>
          <InlineCode>Scenario</InlineCode> allows you to manage mocking by
          presets a single case with multiple APIs.
        </P>
      </header>
      <Separator />
      <div className="overflow-y-auto scrollbar-hide">
        {listScenarios.map((scenario) => {
          const isSelected = selectedScenario?.id === scenario.id
          return (
            <Fragment key={scenario.id}>
              <div className="px-4 py-4 bg-secondary flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <InlineCode className="border-b-gray-500">
                    Description
                  </InlineCode>
                  <P>{scenario.description}</P>
                </div>
                <Toggle
                  value={scenario.id}
                  aria-label="scenario toggle"
                  pressed={isSelected}
                  onPressedChange={(pressed) =>
                    handleToggleScenario(scenario, pressed)
                  }>
                  {isSelected && <Check />}
                  {isSelected ? "Selected" : "Select"}
                </Toggle>
              </div>
              <Table>
                <TableBody>
                  {generatorSerializedRouteHandlers(scenario.handlers).map(
                    (route) => (
                      <TableRow key={route.id} className="py-[16px]">
                        <TableCell width={100}>
                          <MethodTag method={route.method} />
                        </TableCell>
                        <TableCell>
                          <span className="flex-1 pl-[12px] font-semibold text-left break-word inline-block">
                            {route.url}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <HandlerSelect
                              value={route.selectedHandlerId}
                              onValueChange={(handlerId) => {
                                console.log(handlerId, route.id)
                                // onSelectHandler(route.id, handlerId)
                              }}
                              options={route.handlers}
                              defaultValue={
                                route.selectedHandlerId ?? route.handlers[0].id
                              }
                            />
                            {route.origin === "custom" && (
                              <InlineCode>{route.origin}</InlineCode>
                            )}
                            <div className="flex ml-auto items-center">
                              <Switch
                                disabled={!isEnabled}
                                checked={route.enabled}
                                // onCheckedChange={(checked) => {
                                //   onToggleHandler(route.id, checked)
                                // }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
