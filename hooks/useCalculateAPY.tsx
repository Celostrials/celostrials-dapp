import { Fraction, JSBI, Percent, Token, TokenAmount } from "@ubeswap/sdk"
import { BigNumber } from "ethers"
import { useMemo } from "react"
import { config, ZERO } from "../config"
import { useCarbonRewardRate } from "./useCarbonRewardRate"
import { useTotalCarbon } from "./useTotalCarbon"
import { useTotalCarbonized } from "./useTotalCarbonized"
import { useTokenPrice } from "./useUBE"

export function useCalculateAPY() {
  const SECONDS_IN_YEAR = BigNumber.from(365 * 24 * 60 * 60)

  const carbonPrice = useTokenPrice(config.CARBON_ADDRESS) as Fraction
  const celoPrice = useTokenPrice(config.CELO_ADDRESS) as Fraction
  const totalCarbonized = useTotalCarbonized()
  const totalCarbon = useTotalCarbon()
  const carbonRewardRate = useCarbonRewardRate()

  return useMemo(() => {
    if (!totalCarbonized || !totalCarbon || !carbonPrice || !carbonRewardRate)
      return "0"

    if (totalCarbonized.isZero()) return "0"

    const yearlyRate =
      carbonRewardRate.mul(SECONDS_IN_YEAR) || BigNumber.from(0)

    const totalCarbonInUSD = carbonPrice.multiply(totalCarbon.toBigInt())
    const tlvInUSD = celoPrice
      .multiply(BigNumber.from(3).toBigInt())
      .multiply(totalCarbonized.toBigInt())
      .add(totalCarbonInUSD)

    const apy = (
      carbonPrice && totalCarbonized
        ? calcApy(celoPrice.multiply(yearlyRate.toBigInt()), tlvInUSD)[1]
        : new Fraction(ZERO.toBigInt())
    ) as Fraction

    return apy.toFixed(2)
  }, [totalCarbonized, totalCarbon, carbonPrice, carbonRewardRate, celoPrice])
}

export function calcApy(rewardPerYear: Fraction, totalStakedAmount: Fraction) {
  const aprFraction = rewardPerYear
    .multiply(JSBI.exponentiate(JSBI.BigInt("10"), JSBI.BigInt("18")))
    .divide(totalStakedAmount)

  const apr = aprFraction
    ? new Percent(
        aprFraction.numerator,
        JSBI.multiply(
          aprFraction.denominator,
          JSBI.exponentiate(JSBI.BigInt("10"), JSBI.BigInt("18")),
        ),
      )
    : undefined

  const dpy = apr
    ? new Percent(
        Math.floor(
          parseFloat(apr.divide("365").toFixed(10)) * 1_000_000,
        ).toFixed(0),
        "1000000",
      )
    : undefined

  const apy = apr
    ? (Math.pow(1 + parseFloat(apr.toFixed(10)) / 5200, 52) - 1) * 100
    : undefined

  return [aprFraction, apy, dpy]
}
