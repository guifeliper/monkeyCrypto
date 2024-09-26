"use client"

import { useInvestmentBalance } from "@/hooks/use-investment-balance"
import { InvestmentList } from "./investment-list"
import { InvestmentSummary } from "./investment-summary"

export const InvestmentSideBar = () => {
  const { totalBalanceFIAT, data, loading } = useInvestmentBalance()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-none ">
        <InvestmentSummary value={totalBalanceFIAT} />
      </div>
      <div className="flex-auto">
        <InvestmentList investments={data} />
      </div>
    </div>
  )
}
