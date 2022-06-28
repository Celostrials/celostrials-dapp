import { BigNumber } from "@ethersproject/bignumber"
import {
  commify as _commify,
  formatEther,
  formatUnits,
  parseEther,
} from "@ethersproject/units"

import { ZERO } from "../config"
import { WeiSource, wei } from "./wei"
import Wei from "./wei"
import { Currency, FIAT } from "./currencies"

export const commify = (amount?: string) => formatNumber(amount || "0.00")

export const formatBN = (amount?: BigNumber, fixed?: number) => {
  const parsed = parseFloat(formatEther(amount ?? "0"))
  return parsed > 0 ? parsed.toFixed(fixed ? fixed : 2) : "0.00"
}

export const tryParseAmountToBN = (amount: string) => {
  const parsed = parseEther(amount ?? "0")
  return parsed.gt(ZERO) ? parsed : ZERO
}

export const formatNumber = (number: string, decimals = 2): string => {
  const fixedInt = parseFloat(number.split(",").join("")).toFixed(decimals)
  const splitFixedInt = fixedInt.split(".")[0]
  const formattedSubstring = splitFixedInt.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1,"
  )
  if (number.length < 1) {
    return `0${decimals > 0 ? "." + "0".repeat(decimals) : ""}`
  }

  if (Number(number) < 0.01 && Number(number) > 0) {
    return "<0.01"
  }

  return `${formattedSubstring}${
    decimals > 0 ? "." + fixedInt.split(".")[1] : ""
  }`
}

export const addBN = (a: BigNumber, b: BigNumber): BigNumber => a.add(b)

export const divBN = (a: BigNumber, b: BigNumber, scale = 10000): number =>
  a.gt(ZERO) ? a.mul(scale).div(b).toNumber() / scale : 0

export const mulBN = (a: BigNumber, b: number, scale = 10000): BigNumber => {
  return a.mul(Math.round(b * scale)).div(scale)
}

export function formatBigNumber(
  value: BigNumber,
  decimals: number,
  precision = 2
): string {
  return value.gt(ZERO)
    ? formatNumber(Number(formatUnits(value, decimals)).toFixed(precision))
    : "0"
}

export function bigNumberToString(
  value: BigNumber,
  decimals: number,
  precision = 2
): string {
  return Number(formatUnits(value, decimals)).toFixed(precision).toString()
}

export type FormatNumberOptions = {
  minDecimals?: number
  maxDecimals?: number
  prefix?: string
  suffix?: string
}

export type FormatCurrencyOptions = {
  minDecimals?: number
  maxDecimals?: number
  sign?: string
  currencyKey?: string
}

const DEFAULT_CURRENCY_DECIMALS = 2
export const SHORT_CRYPTO_CURRENCY_DECIMALS = 4
export const LONG_CRYPTO_CURRENCY_DECIMALS = 8
export const DEFAULT_CRYPTO_DECIMALS = 4
export const DEFAULT_FIAT_DECIMALS = 2
export const DEFAULT_NUMBER_DECIMALS = 2
export const DEFAULT_PERCENT_DECIMALS = 2

export const getDecimalPlaces = (value: WeiSource) =>
  (value.toString().split(".")[1] || "").length

export const zeroBN = wei(0)

export function numberWithCommas(value: string) {
  var parts = value.split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

export const format = (value: WeiSource, options?: FormatNumberOptions) => {
  const prefix = options?.prefix
  const suffix = options?.suffix

  let weiValue = wei(0)
  try {
    weiValue = wei(value)
  } catch {}

  const formattedValue = []
  if (prefix) {
    formattedValue.push(prefix)
  }

  formattedValue.push(
    numberWithCommas(
      weiValue.toString(options?.minDecimals ?? DEFAULT_NUMBER_DECIMALS)
    )
  )

  if (suffix) {
    formattedValue.push(` ${suffix}`)
  }

  return formattedValue.join("")
}

export const formatCryptoCurrency = (
  value: WeiSource,
  options?: FormatCurrencyOptions
) =>
  format(value, {
    prefix: options?.sign,
    suffix: options?.currencyKey,
    minDecimals: options?.minDecimals ?? DEFAULT_CRYPTO_DECIMALS,
    maxDecimals: options?.maxDecimals,
  })

export const formatFiatCurrency = (
  value: WeiSource,
  options?: FormatCurrencyOptions
) =>
  format(value, {
    prefix: options?.sign,
    suffix: options?.currencyKey,
    minDecimals: options?.minDecimals ?? DEFAULT_FIAT_DECIMALS,
    maxDecimals: options?.maxDecimals,
  })

export const formatCurrency = (
  key: string,
  value: WeiSource,
  options?: FormatCurrencyOptions
) =>
  FIAT.has(key as Currency)
    ? formatFiatCurrency(value, options)
    : formatCryptoCurrency(value, options)

export const formatPercent = (
  value: WeiSource,
  options?: { minDecimals: number }
) => {
  const decimals = options?.minDecimals ?? 2

  return wei(value).mul(100).toString(decimals).concat("%")
}

// TODO: figure out a robust way to get the correct precision.
const getPrecision = (amount: WeiSource) => {
  if (amount >= 1) {
    return DEFAULT_CURRENCY_DECIMALS
  }
  if (amount > 0.01) {
    return SHORT_CRYPTO_CURRENCY_DECIMALS
  }
  return LONG_CRYPTO_CURRENCY_DECIMALS
}

// TODO: use a library for this, because the sign does not always appear on the left. (perhaps something like number.toLocaleString)
export const formatCurrencyWithSign = (
  sign: string | null | undefined,
  value: WeiSource,
  decimals?: number
) => `${sign}${formatCurrency(String(value), decimals || getPrecision(value))}`

export const formatCurrencyWithKey = (
  currencyKey: string,
  value: WeiSource,
  decimals?: number
) =>
  `${formatCurrency(
    String(value),
    decimals || getPrecision(value)
  )} ${currencyKey}`

export function scale(input: Wei, decimalPlaces: number): Wei {
  return input.mul(wei(10).pow(decimalPlaces))
}
