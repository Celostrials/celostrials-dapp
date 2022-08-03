import { useCelo, useConnectedSigner, WalletTypes } from "@celo/react-celo"
import { useToast } from "@chakra-ui/react"
import { BigNumber } from "@ethersproject/bignumber"
import { Contract } from "@ethersproject/contracts"
import { useCallback, useMemo } from "react"
import { Contracts } from "../config"
import { nanoid } from "../functions"
import { formatBN } from "../functions/bignumber"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useAddress } from "./useAccount"
import { useAllowanceCarbonized } from "./useAllowanceCarbonized"

import { useMountedState } from "./useMountedState"
import { CarbonizedCollection__factory } from "../types/factories/CarbonizedCollection__factory"
import { config } from "../config/config"
import { CarbonizedCollection } from "../types/CarbonizedCollection"
import { useCarbonizedContract } from "./useCarbonizedContract"

export type UseApproveResponse = {
  approve: () => Promise<void>
  approving: boolean
  initialLoading: boolean
  approvalState: ApprovalState
  loading: boolean
  error: unknown
}

export enum ApprovalState {
  UNKNOWN = "UNKNOWN",
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

export const useApproveCarbonized = (spender: string): UseApproveResponse => {
  const carbonized = useCarbonizedContract()
  const address = useAddress()

  const [approving, setApproving] = useMountedState(false)
  const {
    approvedForAll,
    loading,
    error,
    initialLoading,
    update: updateAllowance,
  } = useAllowanceCarbonized(spender, address)
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const { walletType } = useCelo()
  const toast = useToast()

  const approvalState: ApprovalState = useMemo(() => {
    if (!spender) return ApprovalState.UNKNOWN

    if (!approvedForAll) return ApprovalState.UNKNOWN

    return approvedForAll
      ? loading
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [approvedForAll, loading, spender])

  const approve = useCallback(async () => {
    setApproving(true)

    try {
      if (
        walletType === WalletTypes.Valora ||
        walletType === WalletTypes.WalletConnect
      )
        toast({
          description: "Confirm transaction on connected wallet app",
          status: "info",
        })
      const resp = await (carbonized &&
        carbonized.setApprovalForAll(spender, true))
      if (resp)
        addTransaction(resp, {
          summary: `Approved Carbonized`,
          approval: { tokenAddress: carbonized.address, spender },
        })

      await resp.wait()
      await updateAllowance()
      setApproving(false)
    } catch (e) {
      if (e && (e as any).code === 4001) {
        console.log("Transaction rejected.")

        addToast({
          toastId: nanoid(),
          content: {
            txn: {
              hash: undefined,
              success: false,
              summary: "Transaction rejected.",
            },
          },
        })
      } else {
        console.error(`Transaction failed`, e, "approved")
        console.log(`Transaction failed: ${(e as any).message}`)

        addToast({
          toastId: nanoid(),
          content: {
            txn: {
              hash: undefined,
              success: false,
              summary: "Oops. Something went wrong.",
            },
          },
        })
      }
    } finally {
      setApproving(false)
    }
  }, [
    spender,
    approvedForAll,
    setApproving,
    addToast,
    addTransaction,
    updateAllowance,
    carbonized,
  ])

  return {
    approve,
    approving,
    approvalState,
    initialLoading,

    get loading() {
      return loading
    },
    get error() {
      return error
    },
  }
}
