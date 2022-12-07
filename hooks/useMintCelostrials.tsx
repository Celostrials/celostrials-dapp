import { BigNumber } from "@ethersproject/bignumber"
import { useCallback, useState } from "react"
import { useCelo, WalletTypes } from "@celo/react-celo"
import { nanoid } from "../functions/nanoid"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useToast } from "@chakra-ui/toast"
import { useCelostrialsContract } from "./useCelostrialsContract"
import { stringToEth } from "../functions/bignumber"

export const useMintCelostrials = () => {
  const celostrials = useCelostrialsContract()
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const [minting, setMinting] = useState(false)
  const { walletType, address } = useCelo()
  const toast = useToast()

  const mint = useCallback(
    async (amount: number) => {
      if (!amount || amount === 0 || !address) return
      let receipt
      try {
        setMinting(true)
        if (
          walletType === WalletTypes.Valora ||
          walletType === WalletTypes.WalletConnect
        )
          toast({
            description: "Confirm transaction on connected wallet app",
            status: "info",
          })

        const cost = await celostrials.cost()

        const gas = await celostrials.estimateGas.mint(address, amount, {
          value: cost.mul(amount),
        })
        const resp = await celostrials.mint(address, amount, {
          value: cost.mul(amount),
          gasLimit: gas.mul(10),
        })

        addTransaction(resp, {
          summary: `Celostrials Mint ${amount}`,
        })

        receipt = await resp.wait()
        setMinting(false)
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
        setMinting(false)
        return receipt
      }
    },
    [celostrials, addTransaction, addToast],
  )

  return { onMint: mint, loading: minting }
}
