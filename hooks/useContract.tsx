import { useConnectedSigner, useProvider } from "@celo/react-celo"
import { Provider } from "@ethersproject/providers"
import { Contract } from "@ethersproject/contracts"
import { Signer } from "ethers"
import { useMemo } from "react"

import { CONTRACTS, Contracts } from "../config"
import {
  getCarbonContract,
  getCarbonizedContract,
  getCarbonRewardsContract,
  getCelostrialsContract,
} from "../functions/contracts"

export function getContract(
  signer?: Signer | Provider,
  key?: Contracts,
): Contract | null {
  if (!signer || !key) return null

  let contract

  switch (key) {
    case Contracts.CELOSTRIALS: {
      contract = getCelostrialsContract(
        CONTRACTS[Contracts.CELOSTRIALS].address,
        signer,
      )
      break
    }
    case Contracts.CARBONIZED: {
      contract = getCarbonizedContract(
        CONTRACTS[Contracts.CARBONIZED].address,
        signer,
      )
      break
    }
    case Contracts.CARBON: {
      contract = getCarbonContract(CONTRACTS[Contracts.CARBON].address, signer)
      break
    }
    case Contracts.CARBON_REWARDS: {
      contract = getCarbonRewardsContract(
        CONTRACTS[Contracts.CARBON_REWARDS].address,
        signer,
      )
      break
    }
  }

  return contract
}

export function useContract(key: Contracts): Contract | null {
  const signer = useConnectedSigner()
  const provider = useProvider()
  return useMemo(() => {
    if (!signer) return getContract(provider, key)

    try {
      return getContract(signer, key)
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [key, signer])
}
