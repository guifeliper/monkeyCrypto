import { authOptions } from "@/lib/auth"
import { executeTradePlan } from "@/lib/execute-trade-plan"
import { generateTradePlan } from "@/lib/generate-trade-plan"
import { getKrakenBalance } from "@/lib/get-kraken-balance"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { z } from "zod"

const carteira = [
  { asset: "XETH", weight: 43.13 },
  { asset: "XXBT", weight: 28.14 },
  { asset: "MATIC", weight: 7.51 },
  { asset: "LDO", weight: 7.23 },
  { asset: "LINK", weight: 0.97 },
  { asset: "DOT", weight: 0.67 },
  { asset: "UNI", weight: 0.52 },
  { asset: "OP", weight: 0.22 },
  { asset: "ARB", weight: 0.2 },
  { asset: "ZUSD", weight: 11.41 },
]

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(JSON.stringify({ totalBalanceFIAT: 0, data: [] }), {
        status: 403,
      })
    }
    const { data, totalBalanceUsd } = await getKrakenBalance()

    const tradePlan = await generateTradePlan(
      carteira,
      data,
      totalBalanceUsd,
      10
    )

    await executeTradePlan(tradePlan)

    return NextResponse.json({ tradePlan }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    console.log(error)
    return new Response(null, { status: 500 })
  }
}
