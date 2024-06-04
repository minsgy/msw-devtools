import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { STATUS_CODES } from "./constants"

export const StatusSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
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
