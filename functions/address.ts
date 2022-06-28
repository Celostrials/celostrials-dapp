import { getAddress } from "@ethersproject/address"

export function validateAndParseAddress(address: string): string {
  try {
    return getAddress(address)
  } catch (error) {
    throw new Error(`${address} is not a valid address.`)
  }
}

export const trimAddress = (address: string, symbols: number): string => {
  if (symbols <= 0) return ""
  if (symbols * 2 >= address.length) return address

  let left = address.slice(0, symbols)
  let right = address.slice(-symbols)

  return `${left}...${right}`
}
