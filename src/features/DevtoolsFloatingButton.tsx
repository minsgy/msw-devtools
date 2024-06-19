import { MswLogo } from "@/shared/icons"
import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { ButtonHTMLAttributes } from "react"
import { match } from "ts-pattern"
import { Position } from ".."

type DevtoolsFloatingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  position?: Position
}

export const DevtoolsFloatingButton = ({
  position = "bottom-right",
  ...rest
}: DevtoolsFloatingButtonProps) => {
  const positionClassName = match(position)
    .with("top-left", () => "top-[16px] left-[16px]")
    .with("top-right", () => "top-[16px] right-[16px]")
    .with("bottom-left", () => "bottom-[16px] left-[16px]")
    .with("bottom-right", () => "bottom-[16px] right-[16px]")
    .otherwise(() => "top-[16px] right-[16px]")

  return (
    <div
      className={cn(
        "z-[100000] fixed p-[4px] text-left flex items-center justify-center rounded-full ",
        positionClassName
      )}>
      {/* TODO: LOGO CHANGE (temporary logo) */}
      <Button
        className="[&>svg]:absolute w-[64px] h-[64px] shadow-md shadow-black transition-transform duration-200 ease-in-out hover:scale-[1.02]"
        variant="destructive"
        {...rest}>
        <MswLogo />
      </Button>
    </div>
  )
}
