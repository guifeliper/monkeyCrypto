import { env } from "@/env.mjs"
import { calculateAssetWeights } from "@/lib/calculate-asset-weights"
import { getKrakenTokenPair } from "@/lib/get-kraken-token-pair"
import { mergeBalanceObjects } from "@/lib/utils"
import { Kraken as PrivateKraken } from "@/services/kraken"
import { Kraken } from "node-kraken-api"

export async function getKrakenBalance() {
  const quote = "ZUSD"
  const privateKraken = new PrivateKraken()
  const kraken = new Kraken({
    key: env.KRANKEN_API_KEY,
    secret: env.KRANKEN_SECRET_KEY,
  })

  const balance = await kraken.balance()
  const assets: any = ((await privateKraken.assetPairs()) as any).result
  let totalBalanceUsd = 0
  const data = await Promise.all(
    Object.entries(balance)
      .filter(([currency, value]) => Number(value) !== 0)
      .map(async ([currency, value]) => {
        const asset = currency.split(".")[0]
        const assetPairs = getKrakenTokenPair(asset, quote, assets)
        let lastPrice = !assetPairs
          ? 1
          : (await privateKraken.lastPrice(assetPairs)) ?? 0

        totalBalanceUsd += parseFloat(value) * lastPrice
        return {
          asset: asset,
          quantity: parseFloat(value),
          pair: assetPairs,
          value: lastPrice,
          totalFIAT: parseFloat(value) * lastPrice,
        }
      })
  )

  const noDuplicates = mergeBalanceObjects(data)
  const weighted = calculateAssetWeights(noDuplicates, totalBalanceUsd)

  return { totalBalanceUsd: totalBalanceUsd, data: weighted }
}
