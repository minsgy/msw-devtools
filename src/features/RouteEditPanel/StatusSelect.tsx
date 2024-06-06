import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { STATUS_CODES } from "./constants"
import { SelectProps } from "@radix-ui/react-select"

export const StatusSelect = ({ ...rest }: SelectProps) => {
  return (
    <Select {...rest}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select HTTP Status" />
      </SelectTrigger>
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
