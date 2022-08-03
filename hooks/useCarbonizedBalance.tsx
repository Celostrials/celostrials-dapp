import { useInterval } from "@chakra-ui/react"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import { ZERO } from "../config"
import { useCarbonizedContract } from "./useCarbonizedContract"

export interface Lock {
  schedules: Schedule[]
}

export interface Schedule {
  amount: ethers.BigNumber
  expirationBlock: ethers.BigNumber
}

export const useCarbonizedBalance = (account?: string) => {
  const contract = useCarbonizedContract()
  const [data, setData] = useState(BigNumber.from(0))

  useInterval(() => {
    if (!account) return
    const handler = async () => setData(await contract.carbonBalance(account))
    handler()
  }, 5000)

  useEffect(() => {
    if (!account) return
    const handler = async () => setData(await contract.carbonBalance(account))
    handler()
  }, [account, contract])

  return data ?? ZERO
}
