import { useInterval } from "@chakra-ui/react"
import { BigNumber, ethers } from "ethers"
import { useEffect, useState } from "react"
import { ZERO } from "../config"
import { useCarbonizedContract } from "./useCarbonizedContract"

export const useMinCarbon = () => {
  const contract = useCarbonizedContract()
  const [data, setData] = useState(BigNumber.from(0))

  useInterval(() => {
    const handler = async () => setData(await contract.minCarbon())

    handler()
  }, 5000)

  useEffect(() => {
    const handler = async () => setData(await contract.minCarbon())
    handler()
  }, [contract])

  return data ?? ZERO
}
