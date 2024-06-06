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
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ id, description }) => (
          <SelectItem key={id} value={id}>
            {description}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
