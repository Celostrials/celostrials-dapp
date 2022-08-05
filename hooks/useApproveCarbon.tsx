import { useCelo, useConnectedSigner, WalletTypes } from "@celo/react-celo"
import { useToast } from "@chakra-ui/react"
import { BigNumber } from "@ethersproject/bignumber"
import { useCallback, useMemo } from "react"
import { config } from "../config"
import { nanoid } from "../functions"
import { formatBN } from "../functions/bignumber"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useAddress } from "./useAccount"
import { useAllowanceCarbon } from "./useAllowanceCarbon"

import { useMountedState } from "./useMountedState"
import { ERC20__factory } from "../types/factories/ERC20__factory"
import { ERC20 } from "../types/ERC20"

export type UseApproveResponse = {
  approve: () => Promise<void>
  approving: boolean
  initialLoading: boolean
  approvalState: ApprovalState
  allowance: BigNumber
  loading: boolean
  error: unknown
}

export enum ApprovalState {
  UNKNOWN = "UNKNOWN",
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

export const useApproveCarbon = (
  amount: BigNumber,
  spender: string,
): UseApproveResponse => {
  const signer = useConnectedSigner()
  const address = useAddress()
  const carbon = (
    signer ? ERC20__factory.connect(config.CARBON_ADDRESS, signer) : undefined
  ) as ERC20
  const [approving, setApproving] = useMountedState(false)
  const {
    allowance,
    loading,
    error,
    initialLoading,
    update: updateAllowance,
  } = useAllowanceCarbon(spender, address)
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const { walletType } = useCelo()
  const toast = useToast()

  const approvalState: ApprovalState = useMemo(() => {
    if (!amount || !spender) return ApprovalState.UNKNOWN

    if (!allowance) return ApprovalState.UNKNOWN

    return allowance.lt(amount)
      ? loading
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [amount, allowance, loading, spender])

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
      const resp = await (carbon && carbon.approve(spender, amount))

      addTransaction(resp, {
        summary: `Approved ${formatBN(amount)} CARBON`,
        approval: { tokenAddress: carbon.address, spender },
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
    amount,
    setApproving,
    addToast,
    addTransaction,
    updateAllowance,
    carbon,
  ])

  return {
    approve,
    approving,
    allowance,
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
