import { useInterval } from "@chakra-ui/react"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import { ZERO } from "../config"
import { useCarbonRewardsContract } from "./useCarbonRewardsContract"

export const useCarbonRewardRate = () => {
  const contract = useCarbonRewardsContract()
  const [data, setData] = useState(BigNumber.from(0))

  useInterval(() => {
    const handler = async () => setData(await contract.rewardRate())
    handler()
  }, 5000)

  useEffect(() => {
    const handler = async () => setData(await contract.rewardRate())
    handler()
  }, [contract])

  return data ?? ZERO
}
