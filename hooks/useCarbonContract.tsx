import { Contracts } from "../config"
import { ERC20, MockCarbon } from "../types"
import { useContract } from "./useContract"

export const useCarbonContract = () =>
  useContract(Contracts.CARBON) as MockCarbon
