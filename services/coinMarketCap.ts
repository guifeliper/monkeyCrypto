import { env } from "@/env.mjs"

export class CoinMarketCap {
  private key: string
  private baseUrl: string

  constructor(key: string) {
    this.key = key
    this.baseUrl = env.COINMARKETCAP_URL
  }

  private async _fetch<T>(
    endpoint: string,
    queryParams: Record<string, any> = {}
  ): Promise<T> {
    const query = new URLSearchParams(queryParams)
    var options = {
      headers: {
        "X-CMC_PRO_API_KEY": env.COINMARKETCAP_API,
      },
      next: { revalidate: 60 * 60 * 24 * 6 },
    }
    const response = await fetch(
      `${this.baseUrl}/${endpoint}?${query}`,
      options
    )
    const data = await response.json()
    return data
  }

  async listings() {
    const endpoint = "v1/cryptocurrency/listings/latest"
    const queryParams = { limit: 100 }
    const listings = await this._fetch(endpoint, queryParams)
    return listings
  }
  async quotes(symbol: string[]) {
    const endpoint = "v1/cryptocurrency/quotes/latest"
    const queryParams = { symbol: symbol.join(",") }
    const listings = await this._fetch(endpoint, queryParams)
    return listings
  }
}
