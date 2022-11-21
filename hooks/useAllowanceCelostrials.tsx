import { Contract } from "@ethersproject/contracts"
import { BigNumber } from "ethers"
import { useCallback, useEffect, useMemo } from "react"
import { KeyedMutator } from "swr"
import { useNoCacheSWR } from "./useSWR"
import { config, Contracts, ZERO } from "../config"
import { useAddress } from "./useAccount"
import { useDebounceCallback } from "./useDebounceCallback"
import { useConnectedSigner } from "@celo/react-celo"
import { Celostrials__factory } from "../types/factories/Celostrials__factory"
import { Celostrials } from "../types/Celostrials"

export type UseAllowanceResponse = {
  mutate: KeyedMutator<any>
  update: () => Promise<any>
  approvedForAll: boolean
  loading: boolean
  initialLoading: boolean
  error: any
}

export const useAllowanceCelostrials = (
  spender: string,
  owner?: string,
): UseAllowanceResponse => {
  const signer = useConnectedSigner()
  const addr = useAddress()
  const provider = signer?.provider
  const address = useMemo(() => owner ?? addr, [owner, addr])

  const celostrials = (
    signer
      ? Celostrials__factory.connect(config.CELOSTRIALS_ADDRESS, signer)
      : undefined
  ) as Celostrials

  const inputs = useMemo(
    () => ["ApprovedForAll", owner, spender],
    [owner, spender],
  )
  const shouldFetch = !!address && !!celostrials && !!celostrials

  const func =
    (contract: Celostrials) =>
    async (_: string, owner: string, spender: string) =>
      await contract.isApprovedForAll(owner, spender)

  const result = useNoCacheSWR<boolean>(
    shouldFetch ? inputs : null,
    func(celostrials),
  )

  const mutate = result.mutate

  const update = useCallback(() => {
    return mutate(undefined, true)
  }, [mutate])

  const updateAllowance = useDebounceCallback(update)

  const subscribeToUpdates = useCallback(() => {
    if (!address || !provider || !celostrials) return

    try {
      const transfer = celostrials.filters.Transfer(address, spender)
      const approve = celostrials.filters.Approval(address, spender)

      provider.on(transfer, updateAllowance)
      provider.on(approve, updateAllowance)

      return () => {
        provider.off(transfer, updateAllowance)
        provider.off(approve, updateAllowance)
      }
    } catch (error) {}
  }, [provider, celostrials, address, spender, updateAllowance])

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
