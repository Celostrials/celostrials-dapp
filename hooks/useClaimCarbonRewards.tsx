import { BigNumber } from "@ethersproject/bignumber"
import { useCallback, useMemo, useState } from "react"
import { useCelo, WalletTypes } from "@celo/react-celo"
import { nanoid } from "../functions/nanoid"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useToast } from "@chakra-ui/toast"
import { useCarbonRewardsContract } from "./useCarbonRewardsContract"

export const useClaimCarbonRewards = () => {
  const carbonRewardsContract = useCarbonRewardsContract()
  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const [claiming, setClaiming] = useState(false)
  const { walletType } = useCelo()
  const toast = useToast()

  const claim = useCallback(async () => {
    try {
      setClaiming(true)
      if (
        walletType === WalletTypes.Valora ||
        walletType === WalletTypes.WalletConnect
      )
        toast({
          description: "Confirm transaction on connected wallet app",
          status: "info",
        })
      const resp = await (carbonRewardsContract &&
        carbonRewardsContract.getReward())

      addTransaction(resp, {
        summary: `Claim Carbon Rewards`,
      })

      await resp.wait()
      setClaiming(false)
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
        console.error(`Transaction failed`, e, "claimn rewards")
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
      setClaiming(false)
    }
  }, [carbonRewardsContract, addTransaction, addToast])

  return { onClaimRewards: claim, loading: claiming }
}
