import { Holdings } from "@/components/holdings"
import { InvestmentSideBar } from "@/components/investment-sidebar"
import { Fragment } from "react"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  return (
    <Fragment>
      <div className="relative grow gap-4 overflow-x-hidden overflow-y-scroll bg-transparent">
        <InvestmentSideBar />
      </div>
      <div className="gap-4">
        <Holdings />
      </div>
    </Fragment>
  )
}
