import { AssetBalance } from "@/types"

export type AssetBalanceWithWeight = AssetBalance & {
  weight: number
}

export function calculateAssetWeights(
  assets: AssetBalance[],
  totalValue: number
): AssetBalanceWithWeight[] {
  if (totalValue <= 0) {
    throw new Error("Total value must be greater than zero")
  }

  const assetWithWeights: AssetBalanceWithWeight[] = assets.map((asset) => ({
    ...asset,
    weight: (asset.totalFIAT / totalValue) * 100,
  }))

  return assetWithWeights
}
