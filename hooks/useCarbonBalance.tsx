import { useInterval } from "@chakra-ui/react"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import { ZERO } from "../config"
import { useCarbonContract } from "./useCarbonContract"

export const useCarbonBalance = (account?: string) => {
  const contract = useCarbonContract()
  const [data, setData] = useState(BigNumber.from(0))

  useInterval(() => {
    if (!account) return
    const handler = async () => setData(await contract.balanceOf(account))
    handler()
  }, 5000)

  useEffect(() => {
    if (!account) return
    const handler = async () => setData(await contract.balanceOf(account))
    handler()
  }, [account, contract])

  return data ?? ZERO
}
