import { useInterval } from "@chakra-ui/react"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import { ZERO } from "../config"
import { useCarbonRewardsContract } from "./useCarbonRewardsContract"

export interface Lock {
  schedules: Schedule[]
}

export interface Schedule {
  amount: ethers.BigNumber
  expirationBlock: ethers.BigNumber
}

export const useCarbonRewards = (account?: string) => {
  const contract = useCarbonRewardsContract()
  const [data, setData] = useState(BigNumber.from(0))

  useInterval(() => {
    if (!account) return
    const handler = async () => setData(await contract.earned(account))
    handler()
  }, 5000)

  useEffect(() => {
    if (!account) return
    const handler = async () => setData(await contract.earned(account))
    handler()
  }, [account, contract])

  return data ?? ZERO
}
