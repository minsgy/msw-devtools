import { MswLogo } from "@/shared/icons"
import { cn } from "@/shared/lib/cn"
import { Button } from "@/shared/ui/button"
import { match } from "ts-pattern"

type DevtoolsButtonProps = {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export const DevtoolsButton = ({
  position = "bottom-right",
}: DevtoolsButtonProps) => {
  const positionClassName = match(position)
    .with("top-left", () => "top-[16px] left-[16px]")
    .with("top-right", () => "top-[16px] right-[16px]")
    .with("bottom-left", () => "bottom-[16px] left-[16px]")
    .with("bottom-right", () => "bottom-[16px] right-[16px]")
    .otherwise(() => "top-[16px] right-[16px]")

  return (
    <div
      className={cn(
        "z-[100000] fixed p-[4px] text-left flex items-center justify-center shadow-md rounded-full",
        positionClassName
      )}
    >
      {/* TODO: LOGO CHANGE (temporary logo) */}
      <Button
        className="[&>svg]:absolute [&>svg]:w-[90%] w-[64px] h-[64px] shadow-inner"
        variant="destructive"
      >
        <MswLogo />
      </Button>
    </div>
  )
}
