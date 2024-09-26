export function getKrakenTokenPair(base, quote, data) {
  for (const key in data) {
    const pairData = data[key]
    if (pairData.base === base && pairData.quote === quote) {
      return key
    }
  }
  return null // Pair not found in the data
}
