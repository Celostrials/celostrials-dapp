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
  approved: boolean
  loading: boolean
  initialLoading: boolean
  error: any
}

export const useAllowanceCelostrial = (
  spender: string,
  tokenId: number,
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
    () => ["Approved", tokenId, spender],
    [spender, tokenId],
  )
  const shouldFetch = !!address && !!tokenId && !!celostrials && !!celostrials

  const func =
    (contract: Celostrials) =>
    async (_: string, tokenId: number, spender: string) =>
      (await contract.getApproved(tokenId)) == spender

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
    if (!address || !provider || !celostrials || !tokenId) return

    try {
      const transfer = celostrials.filters.Transfer(address, spender)
      const approve = celostrials.filters.Approval(address, spender, tokenId)

      provider.on(transfer, updateAllowance)
      provider.on(approve, updateAllowance)

      return () => {
        provider.off(transfer, updateAllowance)
        provider.off(approve, updateAllowance)
      }
    } catch (error) {}
  }, [provider, tokenId, celostrials, address, spender, updateAllowance])

  useEffect(subscribeToUpdates, [subscribeToUpdates])

  return {
    mutate,
    update,

    get approved() {
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
