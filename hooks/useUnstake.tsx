import { BigNumber } from "@ethersproject/bignumber"
import { RestrictedCreditPool } from "ledger"
import { useCallback } from "react"

import { Contracts } from "../config"
import { useContract } from "./useContract"

const unstake = async (pool: RestrictedCreditPool, amount: BigNumber) =>
  await (await pool.withdraw(amount)).wait()

export const useUnstake = () => {
  const stakeContract = useContract(
    Contracts.CREDIT_POOL,
  ) as RestrictedCreditPool

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstake(stakeContract, BigNumber.from(amount))
    },
    [stakeContract],
  )

  return { onUnstake: handleUnstake }
}
