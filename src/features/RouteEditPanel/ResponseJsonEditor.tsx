import CodeMirror, {
  KeyBinding,
  ReactCodeMirrorProps,
  hoverTooltip,
  keymap,
} from "@uiw/react-codemirror"
import { githubDark } from "@uiw/codemirror-theme-github"
import { linter } from "@codemirror/lint"
import { jsonAutoComplete } from "./utils/jsonAutoComplete"
import { autocompletion, closeBracketsKeymap } from "@codemirror/autocomplete"
import { defaultKeymap, historyKeymap } from "@codemirror/commands"
import { json5, json5ParseLinter } from "codemirror-json5"

export type ResponseJsonEditorProps = ReactCodeMirrorProps & {
  onSave?: VoidFunction
}

export const ResponseJsonEditor = ({
  onSave,
  ...rest
}: ResponseJsonEditorProps) => {
  const savedKeymap: KeyBinding = {
    key: "Ctrl-s",
    preventDefault: true,
    run: (editor) => {
      onSave?.()
      return editor.hasFocus
    },
  }

  return (
    <CodeMirror
      style={{ height: "100%" }}
      extensions={[
        json5(),
        linter(json5ParseLinter(), {
          delay: 300,
        }),
        autocompletion({
          defaultKeymap: true,
          icons: true,
          aboveCursor: true,
          activateOnTyping: true,
        }),
        jsonAutoComplete(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...historyKeymap,
          savedKeymap,
        ]),
      ]}
      theme={githubDark}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        indentOnInput: true,
        history: true,
        bracketMatching: true,
      }}
      {...rest}
    />
  )
}
