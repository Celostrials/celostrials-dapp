import { Contract } from "@ethersproject/contracts"
import { BigNumber } from "ethers"
import { useCallback, useEffect, useMemo } from "react"
import { KeyedMutator } from "swr"
import { useNoCacheSWR } from "./useSWR"
import { config, Contracts, ZERO } from "../config"
import { useAddress } from "./useAccount"
import { useDebounceCallback } from "./useDebounceCallback"
import { useConnectedSigner } from "@celo/react-celo"
import { CarbonizedCollection__factory } from "../types/factories/CarbonizedCollection__factory"
import { CarbonizedCollection } from "../types/CarbonizedCollection"

export type UseAllowanceResponse = {
  mutate: KeyedMutator<any>
  update: () => Promise<any>
  approvedForAll: boolean
  loading: boolean
  initialLoading: boolean
  error: any
}

export const useAllowanceCarbonized = (
  spender: string,
  owner?: string,
): UseAllowanceResponse => {
  const signer = useConnectedSigner()
  const addr = useAddress()
  const provider = signer?.provider
  const address = useMemo(() => owner ?? addr, [owner, addr])

  const carbonized = (
    signer
      ? CarbonizedCollection__factory.connect(
          config.CARBONIZED_ADDRESS,
          signer || undefined,
        )
      : null
  ) as CarbonizedCollection

  const inputs = useMemo(() => ["Allowance", owner, spender], [owner, spender])
  const shouldFetch = !!address && !!carbonized && !!carbonized

  const func =
    (contract: CarbonizedCollection) =>
    async (_: string, owner: string, spender: string) =>
      await contract.isApprovedForAll(owner, spender)

  const result = useNoCacheSWR<boolean>(
    shouldFetch ? inputs : null,
    func(carbonized),
  )

  const mutate = result.mutate

  const update = useCallback(() => {
    return mutate(undefined, true)
  }, [mutate])

  const updateAllowance = useDebounceCallback(update)

  const subscribeToUpdates = useCallback(() => {
    if (!address || !provider || !carbonized) return

    try {
      const transfer = carbonized.filters.Transfer(address, spender)
      const approve = carbonized.filters.Approval(address, spender)

      provider.on(transfer, updateAllowance)
      provider.on(approve, updateAllowance)

      return () => {
        provider.off(transfer, updateAllowance)
        provider.off(approve, updateAllowance)
      }
    } catch (error) {}
  }, [provider, carbonized, address, spender, updateAllowance])

  useEffect(subscribeToUpdates, [subscribeToUpdates])

  return {
    mutate,
    update,

    get approvedForAll() {
      return result.data ?? false
    },
    get loading() {
      return result.isValidating
    },
    get initialLoading() {
      return result.data == null && result.isValidating
    },
    get error() {
      return result.error
    },
  }
}
