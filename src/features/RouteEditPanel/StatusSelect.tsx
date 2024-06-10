import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { STATUS_CODES } from "./constants"
import { SelectProps } from "@radix-ui/react-select"
import { FormControl } from "@/shared/ui/form"

export const StatusSelect = ({ ...rest }: SelectProps) => {
  return (
    <Select {...rest}>
      <FormControl>
        <SelectTrigger className="w-[180px] text-left">
          <SelectValue placeholder="Select HTTP Status" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {STATUS_CODES.map(({ label, value }) => {
          return (
            <SelectItem key={value} value={String(value)}>
              {label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
