export type CurrencyKey = string

export enum Currency {
  EUR = "EUR",
  JPY = "JPY",
  USD = "USD",
  AUD = "AUD",
  GBP = "GBP",
}
export const FIAT = new Set([
  Currency.EUR,
  Currency.JPY,
  Currency.USD,
  Currency.AUD,
  Currency.GBP,
])
