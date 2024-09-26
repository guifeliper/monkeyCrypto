import { env } from "@/env.mjs"
import { Kraken } from "node-kraken-api"

// Function to execute a trade plan using Kraken API
export async function executeTradePlan(tradePlan) {
  const kraken = new Kraken({
    key: env.KRANKEN_API_KEY,
    secret: env.KRANKEN_SECRET_KEY,
  })
  for (const action of tradePlan.buy) {
    // Execute buy orders here
    const buyResponse = await kraken.addOrder({
      pair: action.pair,
      type: "buy",
      ordertype: "market",
      volume: action.quantity,
    })
    console.log(`Buy ${action.quantity} ${action.pair}:`, buyResponse)
  }

  for (const action of tradePlan.sell) {
    // Execute sell orders here
    const sellResponse = await kraken.addOrder({
      pair: action.pair,
      type: "sell",
      ordertype: "market",
      volume: action.quantity,
    })
    console.log(`Sell ${action.quantity} ${action.pair}:`, sellResponse)
  }
}
