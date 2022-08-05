import { BigNumber } from "@ethersproject/bignumber"
import { useCallback, useMemo, useState } from "react"
import { useCelo, WalletTypes } from "@celo/react-celo"
import { nanoid } from "../functions/nanoid"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useToast } from "@chakra-ui/toast"
import { useCarbonContract } from "./useCarbonContract"
import { stringToEth } from "../functions/bignumber"

export const useMintCarbon = () => {
  const carbonContract = useCarbonContract()
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const [minting, setMinting] = useState(false)
  const { walletType } = useCelo()
  const toast = useToast()

  const mint = useCallback(async () => {
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
      console.log(carbonContract)
      const resp =
        carbonContract && (await carbonContract.mint(stringToEth("10")))

      addTransaction(resp, {
        summary: `Mint Carbon`,
      })

      await resp.wait()
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
        console.error(`Transaction failed`, e, "mint carbon")
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
    }
  }, [carbonContract, addTransaction, addToast])

  return { onMintCarbon: mint, loading: minting }
}
