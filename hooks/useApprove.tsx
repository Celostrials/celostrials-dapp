// import { useCelo, useConnectedSigner, WalletTypes } from "@celo/react-celo"
// import { useToast } from "@chakra-ui/react"
// import { BigNumber } from "@ethersproject/bignumber"
// import { Contract } from "@ethersproject/contracts"
// import { useCallback, useMemo } from "react"
// import { Contracts } from "../config"
// import { nanoid } from "../functions"
// import { formatBN } from "../functions/bignumber"
// import { useToastControls } from "../state"
// import { useAddTransaction } from "../state/transactions"
// import { useAddress } from "./useAccount"
// import { useAllowance } from "./useAllowance"
// import { useMountedState } from "./useMountedState"

// export type UseApproveResponse = {
//   approve: () => Promise<void>
//   approving: boolean
//   initialLoading: boolean
//   approvalState: ApprovalState
//   allowance: BigNumber
//   loading: boolean
//   error: unknown
// }

// export enum ApprovalState {
//   UNKNOWN = "UNKNOWN",
//   NOT_APPROVED = "NOT_APPROVED",
//   PENDING = "PENDING",
//   APPROVED = "APPROVED",
// }

// export const useApprove = (
//   contract: Contracts,
//   amount: BigNumber,
//   spender: string,
// ): UseApproveResponse => {
//   const signer = useConnectedSigner()
//   const address = useAddress()
//   const factory = getContract(signer || undefined, contract) as Contract
//   const [approving, setApproving] = useMountedState(false)
//   const {
//     allowance,
//     loading,
//     error,
//     initialLoading,
//     update: updateAllowance,
//   } = useAllowance(contract, spender, address)
//   const addTransaction = useAddTransaction()
//   const { addToast } = useToastControls()
//   const { walletType } = useCelo()
//   const toast = useToast()

//   const approvalState: ApprovalState = useMemo(() => {
//     if (!amount || !spender) return ApprovalState.UNKNOWN

//     if (!allowance) return ApprovalState.UNKNOWN

//     return allowance.lt(amount)
//       ? loading
//         ? ApprovalState.PENDING
//         : ApprovalState.NOT_APPROVED
//       : ApprovalState.APPROVED
//   }, [amount, allowance, loading, spender])

//   const approve = useCallback(async () => {
//     setApproving(true)

//     try {
//       if (
//         walletType === WalletTypes.Valora ||
//         walletType === WalletTypes.WalletConnect
//       )
//         toast({
//           description: "Confirm transaction on connected wallet app",
//           status: "info",
//         })
//       const resp = await (factory && factory.approve(spender, amount))

//       addTransaction(resp, {
//         summary: `Approved ${formatBN(amount)} SOURCE`,
//         approval: { tokenAddress: factory.address, spender },
//       })

//       await resp.wait()
//       await updateAllowance()
//       setApproving(false)
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
//         console.error(`Transaction failed`, e, "stake", formatBN(amount))
//         console.log(`Transaction failed: ${(e as any).message}`)

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
//       setApproving(false)
//     }
//   }, [
//     spender,
//     amount,
//     setApproving,
//     addToast,
//     addTransaction,
//     updateAllowance,
//     factory,
//   ])

//   return {
//     approve,
//     approving,
//     allowance,
//     approvalState,
//     initialLoading,

//     get loading() {
//       return loading
//     },
//     get error() {
//       return error
//     },
//   }
// }
