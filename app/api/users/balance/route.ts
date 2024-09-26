import { authOptions } from "@/lib/auth"
import { getKrakenBalance } from "@/lib/get-kraken-balance"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || !session?.user.email) {
      return new Response(JSON.stringify({ totalBalanceFIAT: 0, data: [] }), {
        status: 403,
      })
    }
    const { totalBalanceUsd, data } = await getKrakenBalance()
    return NextResponse.json(
      { totalBalanceFIAT: totalBalanceUsd, data: data },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }
    return new Response(null, { status: 500 })
  }
}
