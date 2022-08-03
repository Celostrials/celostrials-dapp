import { Contracts } from "../config"
import { useContract } from "./useContract"
import { CarbonizedCollection } from "../types/CarbonizedCollection"

export const useCarbonizedContract = () =>
  useContract(Contracts.CARBONIZED) as CarbonizedCollection
