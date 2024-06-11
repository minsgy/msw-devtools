import { ReactNode } from "react"
import { Card } from "./card"

export const FixedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="fixed rounded-md bottom-[24px] right-[24px] w-full max-w-[880px] h-[400px] z-[10] max-[600px]:inset-0 max-[600px]:h-full overflow-hidden text-left">
      {children}
    </Card>
  )
}
