import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { DevtoolsHandler } from "@/types"
import { SelectProps } from "@radix-ui/react-select"

export type HandlerSelectProps = SelectProps & {
  options: DevtoolsHandler[]
}

export const HandlerSelect = ({ options, ...rest }: HandlerSelectProps) => {
  return (
    <Select {...rest}>
      <SelectTrigger className="w-[180px] ml-[12px]">
        <SelectValue placeholder="test" />
      </SelectTrigger>
      <SelectContent>
        {options?.map(({ id, description, status }) => (
          <SelectItem key={id} value={id}>
            {status} - {description}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
