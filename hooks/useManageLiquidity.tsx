// import { BigNumber } from "@ethersproject/bignumber"
// import { formatUnits } from "@ethersproject/units"
// import { useCallback, useMemo, useState } from "react"
// import { useCelo, WalletTypes } from "@celo/react-celo"
// import { ZERO } from "../config"
// import { formatBN } from "../functions/bignumber"
// import { nanoid } from "../functions/nanoid"
// import { useToastControls } from "../state"
// import { useAddTransaction } from "../state/transactions"
// import { useAddress } from "./useAccount"

// import { useStakedBalance } from "./useStakedBalance"
// import { useNoCacheSWR } from "./useSWR"
// import { useToast } from "@chakra-ui/toast"

// export const useGetTotalCredit = () => {
//   const contract = useCreditPoolContract() as RestrictedCreditPool

//   const getTotalCredit = (pool: RestrictedCreditPool) => async (_: string) =>
//     await pool.getTotalCredit()

//   const { data } = useNoCacheSWR<BigNumber>(
//     !!contract ? ["TotalCredit"] : null,
//     getTotalCredit(contract),
//   )

//   return formatUnits(data ?? ZERO, "mwei")
// }

// export const useStake = () => {
//   const contract = useCreditPoolContract() as RestrictedCreditPool
//   const addTransaction = useAddTransaction()
//   const { addToast } = useToastControls()
//   const [staking, setStaking] = useState(false)
//   const { walletType } = useCelo()
//   console.log(walletType)
//   const toast = useToast()

//   const stake = useCallback(
//     async (amount: BigNumber) => {
//       if (!amount || amount.isZero()) return

//       try {
//         setStaking(true)
//         if (
//           walletType === WalletTypes.Valora ||
//           walletType === WalletTypes.WalletConnect
//         )
//           toast({
//             description: "Confirm transaction on connected wallet app",
//             status: "info",
//           })
//         const resp = await (contract && contract.stake(amount))

//         addTransaction(resp, {
//           summary: `Stake ${formatBN(amount)} SOURCE`,
//         })

//         await resp.wait()
//         setStaking(false)
//       } catch (e) {
//         if (e && (e as any).code === 4001) {
//           console.log("Transaction rejected.")

//           addToast({
//             toastId: nanoid(),
//             content: {
//               txn: {
//                 hash: undefined,
//                 success: false,
//                 summary: "Transaction rejected.",
//               },
//             },
//           })
//         } else {
//           console.error(`Transaction failed`, e, "stake", formatBN(amount))
//           console.log(`Transaction failed: ${(e as any).message}`)

//           addToast({
//             toastId: nanoid(),
//             content: {
//               txn: {
//                 hash: undefined,
//                 success: false,
//                 summary: "Oops. Something went wrong.",
//               },
//             },
//           })
//         }
//       } finally {
//         setStaking(false)
//       }
//     },
//     [contract, addTransaction, addToast],
//   )

//   return { onStake: stake, loading: staking }
// }

// export const useWithdraw = () => {
//   const address = useAddress()
//   const contract = useCreditPoolContract() as RestrictedCreditPool
//   const addTransaction = useAddTransaction()
//   const balance = useStakedBalance(address)
//   const { addToast } = useToastControls()
//   const [withdrawing, setWithdrawing] = useState(false)
//   const { walletType } = useCelo()
//   const toast = useToast()

//   const withdraw = useCallback(
//     async (amount: BigNumber) => {
//       if (!amount || amount.isZero() || amount.gt(balance)) return

//       try {
//         setWithdrawing(true)
//         if (
//           walletType === WalletTypes.Valora ||
//           walletType === WalletTypes.WalletConnect
//         )
//           toast({
//             description: "Confirm transaction on connected wallet app",
//             status: "info",
//           })
//         const resp = amount.lt(balance)
//           ? await (contract && contract.withdraw(amount))
//           : await (contract && contract.exit())

//         addTransaction(resp, {
//           summary: `Withdraw ${formatBN(amount)} SOURCE`,
//         })

//         await resp.wait()
//         setWithdrawing(false)
//       } catch (e) {
//         if (e && (e as any).code === 4001) {
//           console.log("Transaction rejected.")

//           addToast({
//             toastId: nanoid(),
//             content: {
//               txn: {
//                 hash: undefined,
//                 success: false,
//                 summary: "Transaction rejected.",
//               },
//             },
//           })
//         } else {
//           console.error(`Transaction failed`, e, "withdraw", formatBN(amount))
//           console.log(`Transaction failed: ${(e as any).message}`)

//           addToast({
//             toastId: nanoid(),
//             content: {
//               txn: {
//                 hash: undefined,
//                 success: false,
//                 summary: "Oops. Something went wrong.",
//               },
//             },
//           })
//         }
//       } finally {
//         setWithdrawing(false)
//       }
//     },
//     [contract, balance, addToast, addTransaction],
//   )

//   return { onWithdraw: withdraw, loading: withdrawing }
// }

// export const useClaimRewards = () => {
//   const contract = useCreditPoolContract() as RestrictedCreditPool
//   const addTransaction = useAddTransaction()
//   const [claiming, setClaiming] = useState(false)
//   const { addToast } = useToastControls()
//   const { walletType } = useCelo()
//   const toast = useToast()

//   const claim = useCallback(async () => {
//     try {
//       setClaiming(true)
//       if (
//         walletType === WalletTypes.Valora ||
//         walletType === WalletTypes.WalletConnect
//       )
//         toast({
//           description: "Confirm transaction on connected wallet app",
//           status: "info",
//         })

//       const resp = await (contract && contract.getReward())

//       addTransaction(resp, {
//         summary: "Claim SOURCE rewards",
//       })

//       await resp.wait()
//       setClaiming(false)
//     } catch (e) {
//       if (e && (e as any).code === 4001) {
//         console.log("Transaction rejected.")

//         addToast({
//           toastId: nanoid(),
//           content: {
//             txn: {
//               hash: undefined,
//               success: false,
//               summary: "Transaction rejected.",
//             },
//           },
//         })
//       } else {
//         console.error(`Transaction failed`, e, "withdraw", (e as any).message)

//         addToast({
//           toastId: nanoid(),
//           content: {
//             txn: {
//               hash: undefined,
//               success: false,
//               summary: "Oops. Something went wrong.",
//             },
//           },
//         })
//       }
//     } finally {
//       setClaiming(false)
//     }
//   }, [contract, addToast, addTransaction])

//   return { onClaim: claim, loading: claiming }
// }
