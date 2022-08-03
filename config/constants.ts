import { BigNumber } from "@ethersproject/bignumber"

import { config } from "./config"
import { Celostrials__factory } from "../types/factories/Celostrials__factory"
import { CarbonizedCollection__factory } from "../types/factories/CarbonizedCollection__factory"
import { ERC20__factory } from "../types/factories/ERC20__factory"
import { CarbonRewards__factory } from "../types/factories/CarbonRewards__factory"

enum Chains {
  MAINNET = "MAINNET",
  ALFAJORES = "ALFAJORES",
  LOCALHOST = "LOCALHOST",
}

export enum ChainId {
  MAINNET = 42220,
  ALFAJORES = 44787,
  LOCALHOST = 31337,
}

export const BlockExplorers = {
  [Chains.MAINNET]: {
    name: "Celo explorer",
    url: "https://explorer.celo.org/",
  },
  [Chains.ALFAJORES]: {
    name: "Alfajores explorer",
    url: "https://alfajores-blockscout.celo-testnet.org/",
  },
}

const Mainnet = {
  id: 42220,
  name: "Celo",
  network: "celo",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "https://forno.celo.org",
  },
  blockExplorers: {
    default: { name: "Celo", url: "https://explorer.celo.org/" },
  },
  testnet: false,
}

const Alfajores = {
  id: 44787,
  name: "Alfajores",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "https://alfajores-forno.celo-testnet.org",
  },
  blockExplorers: {
    default: BlockExplorers.ALFAJORES,
  },
  network: "celo alfajores",
  testnet: true,
}

const Localhost = {
  id: 31337,
  name: "Localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Celo",
    symbol: "CELO",
  },
  rpcUrls: {
    default: "http://127.0.0.1:8545",
  },
  blockExplorers: { default: BlockExplorers.ALFAJORES },
  network: "hardhat network",
  testnet: true,
}

export const CHAIN_INFO = {
  [ChainId.MAINNET]: Mainnet,
  [ChainId.ALFAJORES]: Alfajores,
  [ChainId.LOCALHOST]: Localhost,
}

export type Contract = { [key: string]: { address: string; abi: any } }

export enum Contracts {
  CELOSTRIALS = "CELOSTRIALS",
  CARBONIZED = "CARBONIZED",
  CARBON = "CARBON",
  CELO = "CELO",
  CARBON_REWARDS = "CARBON_REWARDS",
}

export const CONTRACTS: Contract = {
  [Contracts.CELOSTRIALS]: {
    address: config.CELOSTRIALS_ADDRESS,
    abi: Celostrials__factory.abi,
  },
  [Contracts.CARBONIZED]: {
    address: config.CARBONIZED_ADDRESS,
    abi: CarbonizedCollection__factory.abi,
  },
  [Contracts.CARBON]: {
    address: config.CARBON_ADDRESS,
    abi: ERC20__factory.abi,
  },
  [Contracts.CELO]: {
    address: config.CELO_ADDRESS,
    abi: ERC20__factory.abi,
  },
  [Contracts.CARBON_REWARDS]: {
    address: config.CARBON_REWARDS_ADDRESS,
    abi: CarbonRewards__factory.abi,
  },
}

export const MINIMUM_LIQUIDITY = BigNumber.from(1000)
export const ZERO = BigNumber.from(0)
export const ONE = BigNumber.from(1)
export const TWO = BigNumber.from(2)
export const THREE = BigNumber.from(3)
export const FOUR = BigNumber.from(4)
export const FIVE = BigNumber.from(5)
export const TEN = BigNumber.from(10)
export const _100 = BigNumber.from(100)
export const _997 = BigNumber.from(997)
export const _1000 = BigNumber.from(1000)
