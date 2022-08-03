import { Contracts } from "../config"
import { Celostrials } from "../types"
import { useContract } from "./useContract"

export const useCelostrialsContract = () =>
  useContract(Contracts.CELOSTRIALS) as Celostrials
