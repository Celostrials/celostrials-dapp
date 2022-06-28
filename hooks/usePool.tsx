// import { Fraction, JSBI, Percent, Token, TokenAmount } from "@ubeswap/sdk"
// import { BigNumber, ethers } from "ethers"
// import { isAddress } from "ethers/lib/utils"
// import { useEffect, useMemo, useState } from "react"
// import { config, ZERO } from "../config"
// import { wei } from "../functions/wei"
// import { useSourceContract } from "./useSourceContract"
// import { useNoCacheSWR } from "./useSWR"
// import { useAddress } from "./useAccount"
// import { CarbonStaking } from "../types"

// type RewardToken = {
//   rewardsDistributor: string
//   rewardsDuration: BigNumber
//   periodFinish: BigNumber
//   rewardRate: BigNumber
//   lastUpdateTime: BigNumber
//   rewardPerTokenStored: BigNumber
// }

// type RewardState = {
//   rate: BigNumber
//   address: string
//   duration: number
//   finished: number
//   durationInDays: number
//   distribution: number
// } | null

// export const usePool = () => {
//   const [r0, r1] = usePoolRewards()
//   const reward0 = useCalculateReward(r0)
//   const reward1 = useCalculateReward(r1)

//   return [
//     {
//       address: reward0?.address ?? "",
//       rate: reward0?.rate ?? 0,
//       avgApr: reward0?.avgApr ?? new Fraction(ZERO.toBigInt()),
//       duration: r0?.duration ?? 0,
//       finished: r0?.finished ?? 0,
//       durationInDays: r0?.durationInDays ?? 0,
//       distribution: r0?.distribution ?? 0,
//     },
//     {
//       address: reward1?.address ?? "",
//       rate: reward1?.rate ?? 0,
//       avgApr: reward1?.avgApr ?? new Fraction(ZERO.toBigInt()),
//       duration: r1?.duration ?? 0,
//       finished: r1?.finished ?? 0,
//       durationInDays: r1?.durationInDays ?? 0,
//       distribution: r1?.distribution ?? 0,
//     },
//   ]
// }

// export const usePoolRewards = (): RewardState[] => {
//   const contract = useCreditPoolContract()

//   const token0Addr = config.SOURCE_ADDRESS
//   const token1Addr = config.CELO_ADDRESS
//   const shouldFetch = !!contract

//   const getReward =
//     (pool: CarbonStaking) => async (_: string, reward: string) =>
//       (await pool.rewardData(reward)) as RewardToken

//   const token0Data = useNoCacheSWR<RewardToken>(
//     shouldFetch ? ["Reward0", token0Addr] : null,
//     getReward(contract),
//   )

//   const token1Data = useNoCacheSWR<RewardToken>(
//     shouldFetch ? ["Reward1", token1Addr] : null,
//     getReward(contract),
//   )

//   const token0 = token0Data && token0Data.data
//   const token1 = token1Data && token1Data.data

//   return useMemo(() => {
//     if (!contract) return [null, null]

//     let reward0: RewardState
//     let reward1: RewardState

//     if (token0) {
//       const {
//         rewardsDuration: duration0,
//         periodFinish: finish0,
//         rewardRate: rate0,
//       } = token0

//       reward0 = {
//         rate: rate0,
//         address: token0Addr,
//         duration: duration0.toNumber() ?? 0,
//         finished: finish0.toNumber() * 1000 ?? 0,
//         durationInDays: duration0.toNumber() / (3600 * 24),
//         distribution:
//           new Date().getTime() > finish0.toNumber() * 1000
//             ? wei(0).num
//             : wei(ethers.utils.formatEther(rate0.mul(3600 * 24 * 7))).num,
//       }
//     } else reward0 = null

//     if (token1) {
//       const {
//         rewardsDuration: duration1,
//         periodFinish: finish1,
//         rewardRate: rate1,
//       } = token1

//       reward1 = {
//         rate: rate1,
//         address: token1Addr,
//         duration: duration1.toNumber() ?? 0,
//         finished: finish1.toNumber() * 1000 ?? 0,
//         durationInDays: duration1.toNumber() / (3600 * 24) ?? 0,
//         distribution:
//           new Date().getTime() > finish1.toNumber() * 1000
//             ? wei(0).num
//             : wei(ethers.utils.formatEther(rate1.mul(3600 * 24 * 7))).num,
//       }
//     } else reward1 = null

//     return [reward0, reward1]
//   }, [token0Addr, token1Addr, token0, token1, contract])
// }

// export const useTVL = () => {
//   const contract = useCreditPoolContract()
//   const shouldFetch = !!contract

//   const getTVL = (pool: RestrictedCreditPool) => async () =>
//     await pool.totalSupply()

//   const { data } = useNoCacheSWR<BigNumber>(
//     shouldFetch ? ["TVL"] : null,
//     getTVL(contract),
//   )

//   return data ?? BigNumber.from(0)
// }

// export const useIsRestricted = () => {
//   const address = useAddress()
//   const contract = useCreditPoolContract()

//   const [isRestricted, setIsRestricted] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     async function handler() {
//       if (contract) {
//         setIsRestricted(await contract.isRestricted(address))
//         setIsLoading(false)
//       }
//     }
//     if (contract && address) handler()
//   }, [contract, address])
//   return { isRestricted, isLoading }
// }

// export const usePoolRewardsBalance = (
//   account?: string,
//   rewardAddr?: string,
// ) => {
//   const pool = useCreditPoolContract()
//   const source = useSourceContract()
//   const reward = useMemo(
//     () => (rewardAddr ? rewardAddr : source && source.address),
//     [source, rewardAddr],
//   )

//   const inputs = useMemo(
//     () => ["rewards-balance", account, reward],
//     [account, reward],
//   )

//   const shouldFetch = pool && reward && typeof account === "string"

//   const getRewards = () => async (_: string, address: string, reward: string) =>
//     await pool?.earned(address, reward)

//   const { data } = useNoCacheSWR<BigNumber>(
//     shouldFetch ? inputs : null,
//     getRewards(),
//   )

//   return data ?? BigNumber.from(0)
// }

// export const usePoolStakeBalance = (account?: string) => {
//   const pool = useCreditPoolContract()

//   const inputs = useMemo(() => ["rewards-balance", account], [account])

//   const shouldFetch = pool && typeof account === "string"

//   const getBalance = () => async (_: string, address: string, reward: string) =>
//     await pool?.balanceOf(address)

//   const { data } = useNoCacheSWR<BigNumber>(
//     shouldFetch ? inputs : null,
//     getBalance(),
//   )

//   return data ?? BigNumber.from(0)
// }

// export function useCalculateReward(reward?: RewardState) {
//   const SECONDS_IN_YEAR = BigNumber.from(365 * 24 * 60 * 60)
//   const SECONDS_IN_WEEK = BigNumber.from(7 * 24 * 60 * 60)

//   const token = addressToToken(reward?.address ?? "") as Token
//   const price = useTokenPrice(reward?.address) as Fraction
//   const tvl = useTVL()

//   return useMemo(() => {
//     if (!reward || !token || !price) return null

//     if (tvl.isZero())
//       return {
//         poolAddr: config.CREDIT_POOL_ADDRESS,
//         rewards: [],
//       }

//     const yearlyRate = reward.rate.mul(SECONDS_IN_YEAR) || BigNumber.from(0)

//     const apy = (
//       price && tvl
//         ? calcApy(
//             price.multiply(yearlyRate.toBigInt()),
//             price.multiply(tvl.toBigInt()),
//           )[1]
//         : new Fraction(ZERO.toBigInt())
//     ) as Fraction

//     const rewardRate = new TokenAmount(
//       token,
//       reward.rate.mul(SECONDS_IN_WEEK).toBigInt(),
//     )

//     return {
//       address: reward.address ?? "",
//       rate: rewardRate ?? new TokenAmount(token, ZERO.toBigInt()),
//       avgApr: apy,
//     }
//   }, [SECONDS_IN_WEEK, SECONDS_IN_YEAR, reward, token, price, tvl])
// }

// export function calcApy(rewardPerYear: Fraction, totalStakedAmount: Fraction) {
//   const apyFraction = rewardPerYear
//     .multiply(JSBI.exponentiate(JSBI.BigInt("10"), JSBI.BigInt("18")))
//     .divide(totalStakedAmount)

//   const apy = apyFraction
//     ? new Percent(
//         apyFraction.numerator,
//         JSBI.multiply(
//           apyFraction.denominator,
//           JSBI.exponentiate(JSBI.BigInt("10"), JSBI.BigInt("18")),
//         ),
//       )
//     : undefined

//   const dpy = apy
//     ? new Percent(
//         Math.floor(
//           parseFloat(apy.divide("365").toFixed(10)) * 1_000_000,
//         ).toFixed(0),
//         "1000000",
//       )
//     : undefined
//   return [apyFraction, apy, dpy]
// }

// export function addressToToken(tokenAddress?: string): Token | null {
//   const address = isAddress(tokenAddress ?? "")
//   const token = TOKENS.find((token) => token.address === tokenAddress)

//   return address && token ? token.token : null
// }
