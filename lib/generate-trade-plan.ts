import { Kraken as PrivateKraken } from "@/services/kraken"
import { AssetBalance } from "@/types"

type AssetWeight = {
  asset: string
  weight: number
}

type TradeAction = {
  asset: string
  action: "sell" | "buy"
  value: number
  quantity: number | undefined
  pair: string
}

type TradeResult = {
  sell: TradeAction[]
  buy: TradeAction[]
}

export async function generateTradePlan(
  targetPortfolio: AssetWeight[],
  currentPortfolio: AssetBalance[],
  totalBalanceFIAT: number,
  threshold: number = 0
): Promise<TradeResult> {
  const tradePlan: TradeResult = {
    sell: [],
    buy: [],
  }
  const privateKraken = new PrivateKraken()

  for (const targetAsset of targetPortfolio) {
    const currentAsset = currentPortfolio.find(
      (a) => a.asset === targetAsset.asset
    )

    if (currentAsset) {
      if (!currentAsset.pair) {
        continue //not best practice
      }
      const weightDiff = targetAsset.weight - currentAsset.weight
      const valueDiff = Math.abs((weightDiff / 100) * totalBalanceFIAT)
      const quantityDiff = Math.abs(
        (totalBalanceFIAT * (weightDiff / 100)) / currentAsset.value
      )

      if (Math.abs(valueDiff) >= threshold) {
        if (weightDiff > 0) {
          tradePlan.buy.push({
            asset: targetAsset.asset,
            action: "buy",
            value: valueDiff,
            quantity: quantityDiff,
            pair: currentAsset.pair,
          })
        } else if (weightDiff < 0) {
          tradePlan.sell.push({
            asset: targetAsset.asset,
            action: "sell",
            value: valueDiff,
            quantity: quantityDiff,
            pair: currentAsset.pair,
          })
        }
      }
    } else {
      // Asset not found in current portfolio, so we need to buy it
      if (targetAsset.weight >= threshold) {
        const lastPrice = await privateKraken.lastPrice(
          `${targetAsset.asset}USD`
        )
        const valueDiff = Math.abs(
          (targetAsset.weight / 100) * totalBalanceFIAT
        )

        const quantityDiff = !lastPrice
          ? undefined
          : (totalBalanceFIAT * (targetAsset.weight / 100)) / lastPrice
        // get last price so we can get the quantity
        tradePlan.buy.push({
          asset: targetAsset.asset,
          action: "buy",
          value: valueDiff,
          quantity: quantityDiff,
          pair: `${targetAsset.asset}USD`,
        })
      }
    }
  }

  // Check for assets to sell (not present in target portfolio)
  for (const currentAsset of currentPortfolio) {
    const targetAsset = targetPortfolio.find(
      (a) => a.asset === currentAsset.asset
    )

    if (!currentAsset.pair) {
      continue //not best practice
    }

    if (!targetAsset) {
      if (currentAsset.totalFIAT >= threshold) {
        tradePlan.sell.push({
          asset: currentAsset.asset,
          action: "sell",
          value: currentAsset.totalFIAT,
          quantity: currentAsset.quantity,
          pair: currentAsset.pair,
        })
      }
    }
  }

  return tradePlan
}
