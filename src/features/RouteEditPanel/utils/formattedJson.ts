import { format } from "prettier"
import babel from "prettier/plugins/babel"
import prettierPluginEstree from "prettier/plugins/estree"

export const formattedJson = async (field: string) => {
  const formattedResponse = await format(field, {
    tabWidth: 4,
    printWidth: 100,
    parser: "json5",
    plugins: [babel, prettierPluginEstree],
  })
  return formattedResponse
}
