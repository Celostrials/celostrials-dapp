import { useCelo, useConnectedSigner, WalletTypes } from "@celo/react-celo"
import { useToast } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo } from "react"
import { nanoid } from "../functions"
import { useToastControls } from "../state"
import { useAddTransaction } from "../state/transactions"
import { useAddress } from "./useAccount"
import { useMountedState } from "./useMountedState"
import { useCarbonizedContract } from "./useCarbonizedContract"
import { Carbonizer__factory } from "../types"
import { formatEther } from "ethers/lib/utils"

export type UseApproveResponse = {
  decarbonize: (tokenId: string) => Promise<void>
  withdraw: (tokenId: string) => Promise<void>
  decarbonizing: boolean
  withdrawing: boolean
  hoursLeft: number
  withdrawalAmount: number
  decarbonizeState: DecarbonizeState
  loading: boolean
}

export enum DecarbonizeState {
  UNKNOWN = "UNKNOWN",
  CARBONIZED = "CARBONIZED",
  DECARBONIZING = "DECARBONIZING",
  DECARBONIZED = "DECARBONIZED",
}

export const useDecarbonize = (tokenId: string): UseApproveResponse => {
  const carbonizedCollection = useCarbonizedContract()
  const [decarbonizing, setDecarbonizing] = useMountedState(false)
  const [withdrawing, setWithdrawing] = useMountedState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useMountedState(0)
  const [hoursLeft, setHoursLeft] = useMountedState(0)
  const [isCarbonized, setIsCarbonized] = useMountedState(false)
  const [refetch, setRefetch] = useMountedState(false)
  const [loading, setLoading] = useMountedState(false)
  const signer = useConnectedSigner()

  const addTransaction = useAddTransaction()
  const { addToast } = useToastControls()
  const { walletType } = useCelo()
  const toast = useToast()

  useEffect(() => {
    const handler = async () => {
      setLoading(true)
      if (!signer) return

      const carbonizer = Carbonizer__factory.connect(
        await carbonizedCollection.carbonizer(Number(tokenId)),
        signer,
      )

      console.log(carbonizer.address)

      const withdrawals = await carbonizer.withdrawls()
      const finish = withdrawals.timestamp.toNumber()
      setIsCarbonized(await carbonizedCollection.exists(tokenId))
      setHoursLeft(Math.ceil((finish - Date.now() / 1000) / (60 * 60)) || 0)
      setWithdrawalAmount(Number(formatEther(withdrawals.value)))
      setRefetch(false)
      setLoading(false)
    }

    if (signer && carbonizedCollection) handler()
  }, [signer, refetch, carbonizedCollection])

  const decarbonizeState: DecarbonizeState = useMemo(() => {
    if (!tokenId || !signer || !carbonizedCollection)
      return DecarbonizeState.UNKNOWN
    if (isCarbonized && hoursLeft > 0 && withdrawalAmount > 0) {
      return DecarbonizeState.DECARBONIZING
    }
    if (isCarbonized && hoursLeft <= 0 && withdrawalAmount > 0) {
      return DecarbonizeState.DECARBONIZED
    }
    if (isCarbonized) return DecarbonizeState.CARBONIZED

    return DecarbonizeState.UNKNOWN
  }, [
    isCarbonized,
    hoursLeft,
    carbonizedCollection,
    withdrawalAmount,
    signer,
    tokenId,
  ])

  const decarbonize = useCallback(
    async (tokenId: string) => {
      setDecarbonizing(true)

      try {
        if (
          walletType === WalletTypes.Valora ||
          walletType === WalletTypes.WalletConnect
        )
          toast({
            description: "Confirm transaction on connected wallet app",
            status: "info",
          })
        const resp = await (carbonizedCollection &&
          carbonizedCollection.startDecarbonize(tokenId))

        addTransaction(resp, {
          summary: `Carbonizing Celostrial`,
        })

        await resp.wait()
        setRefetch(true)
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
        setDecarbonizing(false)
      }
    },
    [
      tokenId,
      isCarbonized,
      setDecarbonizing,
      addToast,
      addTransaction,
      carbonizedCollection,
    ],
  )

  const withdraw = useCallback(
    async (tokenId: string) => {
      setWithdrawing(true)

      try {
        if (
          walletType === WalletTypes.Valora ||
          walletType === WalletTypes.WalletConnect
        )
          toast({
            description: "Confirm transaction on connected wallet app",
            status: "info",
          })
        const resp = await (carbonizedCollection &&
          carbonizedCollection.decarbonize(tokenId))

        addTransaction(resp, {
          summary: `Withdrawing from Celostrial`,
        })

        await resp.wait()
        setRefetch(true)
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
        setDecarbonizing(false)
      }
    },
    [
      tokenId,
      isCarbonized,
      setDecarbonizing,
      addToast,
      addTransaction,
      carbonizedCollection,
    ],
  )

  return {
    decarbonize,
    withdraw,
    decarbonizing,
    withdrawing,
    decarbonizeState,
    hoursLeft,
    withdrawalAmount,
    get loading() {
      return loading
    },
  }
}
