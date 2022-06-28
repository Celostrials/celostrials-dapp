import { useCelo } from "@celo/react-celo"
import { useMemo } from "react"

export const useAddress = () => {
  const { address } = useCelo()
  return address || ""
}

export const useChainId = () => {
  const { network } = useCelo()
  return network.chainId
}
