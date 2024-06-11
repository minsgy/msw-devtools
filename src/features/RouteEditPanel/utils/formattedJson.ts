import { format } from "prettier"
import babel from "prettier/plugins/babel"
import prettierPluginEstree from "prettier/plugins/estree"

export const formattedJson = async (field: string) => {
  const formattedResponse = await format(field, {
    tabWidth: 4,
    printWidth: 10,
    parser: "json5",
    plugins: [babel, prettierPluginEstree],
  })
  // LINK: https://github.com/prettier/prettier/issues/6360
  return formattedResponse.replace(/[\r\n]+$/, "")
}
