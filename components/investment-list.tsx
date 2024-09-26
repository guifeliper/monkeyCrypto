import {
  InvestmentListItem,
  InvestmentListItemSkeleton,
} from "@/components/investment-list-item"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetBalance } from "@/types"
interface InvestmentListProps {
  investments: AssetBalance[]
}

export function InvestmentList({ investments }: InvestmentListProps) {
  return (
    <Tabs defaultValue="investments" className="h-full w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="investments">Invesments</TabsTrigger>
        <TabsTrigger value="pies">Pies</TabsTrigger>
      </TabsList>
      <TabsContent value="pies">
        <Card>
          <CardHeader>
            <CardTitle>Pies</CardTitle>
            <CardDescription>
              Select an pie to view more details.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[680px] space-y-2 overflow-scroll"></CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="investments">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Investments</CardTitle>
            <CardDescription>
              Select an investment to view more details.
            </CardDescription>
          </CardHeader>
          <CardContent className="grow space-y-2 overflow-scroll p-6 pt-0">
            {investments.length === 0 ? <InvestmentListItemSkeleton /> : null}
            {investments.map((investment) => (
              <InvestmentListItem key={investment.asset} data={investment} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
