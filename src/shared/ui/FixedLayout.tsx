import { ReactNode } from "react"
import { Card } from "./card"

export const FixedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="bottom-0 right-0 left-0 h-[400px] fixed">{children}</Card>
  )
}
