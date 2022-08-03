import { Contract } from "@ethersproject/contracts"
import { BigNumber } from "ethers"
import { useCallback, useEffect, useMemo } from "react"
import { KeyedMutator } from "swr"
import { useNoCacheSWR } from "./useSWR"
import { config, Contracts, ZERO } from "../config"
import { useAddress } from "./useAccount"
import { useDebounceCallback } from "./useDebounceCallback"
import { useConnectedSigner } from "@celo/react-celo"
import { ERC20, ERC20__factory } from "../types"

export type UseAllowanceResponse = {
  mutate: KeyedMutator<any>
  update: () => Promise<any>
  allowance: BigNumber
  loading: boolean
  initialLoading: boolean
  error: any
}

export const useAllowanceCarbon = (
  spender: string,
  owner?: string,
): UseAllowanceResponse => {
  const signer = useConnectedSigner()
  const addr = useAddress()
  const provider = signer?.provider
  const address = useMemo(() => owner ?? addr, [owner, addr])

  const carbon = (
    signer
      ? ERC20__factory.connect(config.CARBON_ADDRESS, signer || undefined)
      : null
  ) as ERC20

  const inputs = useMemo(() => ["Allowance", owner, spender], [owner, spender])
  const shouldFetch = !!address && !!carbon && !!carbon

  const func =
    (contract: ERC20) => async (_: string, owner: string, spender: string) =>
      await contract.allowance(owner, spender)

  const result = useNoCacheSWR<BigNumber>(
    shouldFetch ? inputs : null,
    func(carbon),
  )

  const mutate = result.mutate

  const update = useCallback(() => {
    return mutate(undefined, true)
  }, [mutate])

  const updateAllowance = useDebounceCallback(update)

  const subscribeToUpdates = useCallback(() => {
    if (!address || !provider || !carbon) return

    try {
      const transfer = carbon.filters.Transfer(address, spender)
      const approve = carbon.filters.Approval(address, spender)

      provider.on(transfer, updateAllowance)
      provider.on(approve, updateAllowance)

      return () => {
        provider.off(transfer, updateAllowance)
        provider.off(approve, updateAllowance)
      }
    } catch (error) {}
  }, [provider, carbon, address, spender, updateAllowance])

  useEffect(subscribeToUpdates, [subscribeToUpdates])

  return {
    mutate,
    update,

    get allowance() {
      return result.data ?? ZERO
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
