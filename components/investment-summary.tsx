import { Card, CardHeader, CardTitle } from "./ui/card"

interface InvestmentSummaryProps {
  value: number
}
export const InvestmentSummary = ({ value = 0 }: InvestmentSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">€{value.toLocaleString()}</CardTitle>
      </CardHeader>
    </Card>
  )
}
