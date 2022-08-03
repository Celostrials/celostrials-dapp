import { Contracts } from "../config"
import { useContract } from "./useContract"
import { CarbonRewards } from "../types/CarbonRewards"

export const useCarbonRewardsContract = () =>
  useContract(Contracts.CARBON_REWARDS) as CarbonRewards
