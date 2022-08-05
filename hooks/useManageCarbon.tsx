import { BigNumber } from "@ethersproject/bignumber"
import { useCallback, useMemo, useState } from "react"
import { useCelo, WalletTypes } from "@celo/react-celo"
import { nanoid } from "../functions/nanoid"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useToast } from "@chakra-ui/toast"
import { useCarbonizedContract } from "./useCarbonizedContract"

export const useCarbonize = () => {
  const carbonizeContract = useCarbonizedContract()
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const [carbonizing, setCarbonizing] = useState(false)
  const { walletType } = useCelo()
  const toast = useToast()

  const carbonize = useCallback(
    async (tokenIds: number[], amount: BigNumber) => {
      if (!amount || amount.isZero()) return

      try {
        setCarbonizing(true)
        if (
          walletType === WalletTypes.Valora ||
          walletType === WalletTypes.WalletConnect
        )
          toast({
            description: "Confirm transaction on connected wallet app",
            status: "info",
          })
        const amounts = tokenIds.map(() => amount)
        const resp = await (carbonizeContract &&
          carbonizeContract.carbonizeBatch(tokenIds, amounts))

        addTransaction(resp, {
          summary: `Carbonize ${tokenIds.length} Item${
            tokenIds.length > 1 ? "s" : ""
          }`,
        })

        await resp.wait()
        setCarbonizing(false)
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
          console.error(`Transaction failed`, e, "carboinze", tokenIds.length)
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
        setCarbonizing(false)
      }
    },
    [carbonizeContract, addTransaction, addToast],
  )

  return { onCarbonize: carbonize, loading: carbonizing }
}

export const useDecarbonize = () => {
  const carbonizeContract = useCarbonizedContract()
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const [decarbonizing, setDecarbonizing] = useState(false)
  const { walletType } = useCelo()
  const toast = useToast()

  const decarbonize = useCallback(
    async (tokenIds: number[]) => {
      if (!tokenIds || tokenIds.length < 1) return

      try {
        setDecarbonizing(true)
        if (
          walletType === WalletTypes.Valora ||
          walletType === WalletTypes.WalletConnect
        )
          toast({
            description: "Confirm transaction on connected wallet app",
            status: "info",
          })
        const resp = await (carbonizeContract &&
          carbonizeContract.decarbonizeBatch(tokenIds))
        addTransaction(resp, {
          summary: `Decarbonize ${tokenIds.length} Item${
            tokenIds.length > 1 ? "s" : ""
          }`,
        })

        await resp.wait()
        setDecarbonizing(false)
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
          console.error(`Transaction failed`, e, "decarbonize", tokenIds.length)
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
        setDecarbonizing(false)
      }
    },
    [carbonizeContract, addToast, addTransaction],
  )

  return { onDecarbonize: decarbonize, loading: decarbonizing }
}
