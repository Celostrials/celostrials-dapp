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
import { useAllowanceCelostrials } from "./useAllowanceCelostrials"

import { useMountedState } from "./useMountedState"
import { useCelostrialsContract } from "./useCelostrialsContract"

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

export const useApproveCelostrials = (spender: string): UseApproveResponse => {
  const address = useAddress()
  const celostrials = useCelostrialsContract()
  const [approving, setApproving] = useMountedState(false)
  const {
    approvedForAll,
    loading,
    error,
    initialLoading,
    update: updateAllowance,
  } = useAllowanceCelostrials(spender, address)
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const { walletType } = useCelo()
  const toast = useToast()

  const approvalState: ApprovalState = useMemo(() => {
    if (!spender) return ApprovalState.UNKNOWN

    return !approvedForAll
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
      const resp = await (celostrials &&
        celostrials.setApprovalForAll(spender, true))

      addTransaction(resp, {
        summary: `Approved Celostrials`,
        approval: { tokenAddress: celostrials.address, spender },
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
        console.error(`Transaction failed`, e, "approve")
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
    celostrials,
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
