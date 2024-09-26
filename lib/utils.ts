import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "@/env.mjs"
import { AssetBalance } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function mergeBalanceObjects(data): AssetBalance[] {
  const mergedData = {}

  for (const item of data) {
    const key = `${item.asset}-${item.pair}`
    if (!mergedData[key]) {
      mergedData[key] = { ...item }
    } else {
      mergedData[key].quantity = (
        +mergedData[key].quantity + +item.quantity
      ).toFixed(10)
      mergedData[key].totalFIAT = (
        +mergedData[key].totalFIAT + +item.totalFIAT
      ).toFixed(10)
    }
  }

  return Object.values(mergedData)
}
