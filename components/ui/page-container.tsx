import { PropsWithChildren } from "react";

export default function PageContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col px-4 py-6">
      {children}
    </div>
  )
}