import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { AssetBalance } from "@/types"
import { VariantProps, cva } from "class-variance-authority"
import React from "react"

const wrapperVariants = cva(
  "flex cursor-pointer items-center rounded-md p-2 hover:bg-muted",
  {
    variants: {
      selected: {
        true: "bg-muted",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)
interface InvestmentListItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  data: AssetBalance
}

export function InvestmentListItem({
  selected,
  data,
}: InvestmentListItemProps) {
  return (
    <div className={cn(wrapperVariants({ selected }))}>
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{data.asset}</p>
        <p className="text-sm text-muted-foreground">{data.pair}</p>
      </div>
      <div className="ml-auto space-y-1">
        <p className="text-right text-sm font-medium leading-none">
          {data.totalFIAT.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="text-right text-sm text-muted-foreground">
          {data.quantity.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  )
}

export const InvestmentListItemSkeleton = () => {
  return Array.from({ length: 12 }).map((_, i) => (
    <Skeleton className="h-10 w-full" />
  ))
}
