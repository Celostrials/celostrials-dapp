import { formatUnits, parseEther, parseUnits } from "@ethersproject/units"

import useRequest from "./useRequest"

const apiV3Url = "https://api.coingecko.com/api/v3/simple/price?"

const getCeloCoinGeckoUrl = (denomination: string) =>
  apiV3Url + `ids=celo&vs_currencies=${denomination}`
const usd = "usd"

export const useCELOPrice = (): number => {
  const { data } = useRequest({
    url: getCeloCoinGeckoUrl(usd),
  })

  return (data && (data as any)["celo"].usd) ?? 0
}

export const useCeloToUSD = (amount: string): string => {
  const usdCelo = useCELOPrice()

  if (!usdCelo) return "0"

  const fixedCelo = usdCelo.toFixed(2).toString()
  const amtCelo = parseEther(amount.toString() ?? "0")

  return formatUnits(amtCelo.mul(parseUnits(fixedCelo, 2)).div(100), 18)
}
