import { BigNumber } from "@ethersproject/bignumber"
import { useCallback, useState } from "react"
import { useCelo, WalletTypes } from "@celo/react-celo"
import { nanoid } from "../functions/nanoid"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useToast } from "@chakra-ui/toast"
import { stringToEth } from "../functions/bignumber"
import { useCarbonizedContract } from "./useCarbonizedContract"

export const useCarbonize = () => {
  const carbonized = useCarbonizedContract()
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const [carbonizing, setCarbonizing] = useState(false)
  const { walletType, address } = useCelo()
  const toast = useToast()

  const carbonize = useCallback(
    async (tokenId: number, amount: number) => {
      if (!amount || amount === 0 || !address) return
      let receipt
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

        const resp = await carbonized.carbonize(tokenId, {
          value: stringToEth(amount.toString()),
        })

        addTransaction(resp, {
          summary: `Carbonize Celostrial ${tokenId} with ${amount} celo`,
        })

        receipt = await resp.wait()
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
          console.error(`Transaction failed`, e, "Celostrails", amount)
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
        return receipt
      }
    },
    [carbonized, addTransaction, addToast],
  )

  return { carbonize, carbonizing }
}
