// import { BigNumber } from "ethers"

// import { ZERO } from "../config"
// import { useCreditPoolContract } from "./useCreditPoolContract"
// import { useEffect, useState } from "react"
// import { useInterval } from "react-use"

// export const useStakedBalance = (account?: string) => {
//   const contract = useCreditPoolContract()
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
