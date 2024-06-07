import { twMerge } from "tailwind-merge"
import { Input, InputProps } from "./input"
import { Label } from "./label"

type InputContainerProps = InputProps & {
  label: string
  containerClassName?: string
}

export const InputContainer = ({
  containerClassName,
  label,
  ...rest
}: InputContainerProps) => {
  return (
    <div className={twMerge("flex items-center", containerClassName)}>
      <Label
        htmlFor={rest.id}
        className="text-primary flex-shrink-0 font-semibold"
      >
        {label}
      </Label>
      <Input className={twMerge("ml-[12px]", rest.className)} {...rest} />
    </div>
  )
}
