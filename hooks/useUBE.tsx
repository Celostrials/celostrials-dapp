import { Fraction } from "@ubeswap/sdk"
import { request, gql } from "graphql-request"
import { useMemo } from "react"
import useSWR from "swr"
import { config } from "../config/config"

export const useTokenPrice = (tokenAddress?: string) => {
  const subgraph = "https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap"
  const fetcher = (query: string) => request(subgraph, query)

  const queryGql = gql`
    {
      token(id: "${tokenAddress}") {
        id
        derivedCUSD
      }
    }
  `

  const shouldFetch = !!tokenAddress
  const { data } = useSWR(shouldFetch ? queryGql : "", fetcher)

  return useMemo(
    () => data && data.token && priceToFraction(data.token.derivedCUSD),
    [data],
  )
}

export function priceToFraction(
  priceString: string | undefined,
): Fraction | undefined {
  if (!priceString) return undefined
  const price = parseFloat(priceString) * 10 ** 4
  const asFraction = new Fraction(price.toFixed(0), "10000")
  return asFraction ?? undefined
}
