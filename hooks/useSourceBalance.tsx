// import { useInterval } from "@chakra-ui/react"
// import { BigNumber, ethers } from "ethers"
// import { SourceTokenV3 } from "ledger"
// import { useEffect, useState } from "react"
// import { useEffectOnce } from "react-use"
// import { ZERO } from "../config"
// import { useSourceContract } from "./useSourceContract"
// import { useNoCacheSWR } from "./useSWR"

// export interface Lock {
//   schedules: Schedule[]
// }

// export interface Schedule {
//   amount: ethers.BigNumber
//   expirationBlock: ethers.BigNumber
// }

// export const useSourceBalance = (account?: string) => {
//   const contract = useSourceContract()
//   const [data, setData] = useState(BigNumber.from(0))

//   useInterval(() => {
//     if (!account) return
//     const handler = async () => setData(await contract.balanceOf(account))
//     handler()
//   }, 5000)

//   useEffect(() => {
//     if (!account) return
//     const handler = async () => setData(await contract.balanceOf(account))
//     handler()
//   }, [account, contract])

//   return data ?? ZERO
// }

// export const useLockedSourceBalance = (account?: string) => {
//   const contract = useSourceContract()
//   const shouldFetch = account && typeof account === "string" && !!contract

//   const getLockedTokenBalance =
//     (source: SourceTokenV3) => async (_: string, address: string) =>
//       await source.lockedBalanceOf(address)

//   const { data } = useNoCacheSWR<BigNumber>(
//     shouldFetch ? ["LockedBalance", account] : null,
//     getLockedTokenBalance(contract),
//   )

//   return data ?? ZERO
// }

// export const useGetLockSchedules = (account?: string) => {
//   const contract = useSourceContract()
//   const shouldFetch = account && typeof account === "string" && !!contract

//   const getLockSchedules =
//     (source: SourceTokenV3) => async (_: string, address: string) =>
//       (await source.getLockSchedules(address)) as Lock

//   const { data } = useNoCacheSWR<Lock>(
//     shouldFetch ? ["LockSchedules", account] : null,
//     getLockSchedules(contract),
//   )

//   return data ?? null
// }
