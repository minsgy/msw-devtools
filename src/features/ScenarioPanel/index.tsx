import {
  useIsEnabledValue,
  useWorkerValue,
} from "@/providers/useMswDevtoolsContext"
import { Separator } from "@/shared/ui/separator"
import { H2, InlineCode, P } from "@/shared/ui/typography"
import { generatorSerializedRouteHandlers } from "@/shared/utils/generatorSerializedRouteHandlers"
import { TableRow, TableBody, TableCell, Table } from "@/shared/ui/table"
import { MethodTag } from "../DevtoolsHandlerList"

import { Switch } from "@/shared/ui/switch"
import { Fragment } from "react"
import { HandlerSelect } from "../HandlerSelect"
export const ScenarioPanel = () => {
  const isEnabled = useIsEnabledValue()
  const { listScenarios } = useWorkerValue()

  return (
    <div className="flex flex-col w-full h-full">
      <header className="flex justify-between align-items px-[16px] py-[12px]">
        <H2>Scenario Case</H2>
      </header>
      <Separator />
      <div className="overflow-y-auto scrollbar-hide">
        {listScenarios().map((scenario) => (
          <Fragment key={scenario.id}>
            <div className="px-4 py-4 bg-secondary">
              <P>
                <InlineCode>Description</InlineCode> {scenario.description}
              </P>
            </div>
            <Table>
              <TableBody>
                {generatorSerializedRouteHandlers(scenario.handlers).map(
                  (route) => (
                    <TableRow key={route.id} className="py-[16px]">
                      <TableCell>
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
        ))}
      </div>
    </div>
  )
}
