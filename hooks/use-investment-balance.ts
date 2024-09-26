import { InvestmentBalanceData } from "@/types"
import * as React from "react"

interface useInvestmentBalance extends InvestmentBalanceData {
  loading: boolean
}
export function useInvestmentBalance(): useInvestmentBalance {
  const [balance, setBalance] = React.useState<InvestmentBalanceData>({
    totalBalanceFIAT: 0,
    data: [],
  })

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true)
      const response = await fetch("/api/users/balance")
      const data = (await response.json()) as InvestmentBalanceData
      setBalance(data)
      setLoading(false)
    }
    fetchBalance()
  }, [])

  return { loading, ...balance }
}
