import { Signer } from "@ethersproject/abstract-signer"
import { BaseContract } from "@ethersproject/contracts"
import { Provider } from "@ethersproject/providers"
import { CarbonizedCollection__factory, Carbonizer } from "../types"
import { Celostrials__factory } from "../types/factories/Celostrials__factory"
import { Celostrials } from "../types/Celostrials"
import { Carbonizer__factory } from "../types/factories/Carbonizer__factory"

export interface Factory<C extends BaseContract> {
  connect(address: string, signerOrProvider: Signer | Provider): C
}

export const createContractGetter = <C extends BaseContract>(
  factory: Factory<C>,
): ((
  address: string,
  signerOrProvider: Signer | Provider,
  cacheSeed?: number,
) => C) => {
  const providerCache = new WeakMap<Signer | Provider, Record<string, C>>()

  return (address, signerOrProvider, cacheSeed = 0) => {
    const cacheByAddressKey = `${address}-${cacheSeed}`
    let cacheByAddress = providerCache.get(signerOrProvider)
    let contract = cacheByAddress?.[cacheByAddressKey]

    if (!cacheByAddress) {
      cacheByAddress = {}
      providerCache.set(signerOrProvider, cacheByAddress)
    }

    if (!contract) {
      contract = factory.connect(address, signerOrProvider)
      cacheByAddress[cacheByAddressKey] = contract
    }

    return contract
  }
}

export const getCelostrialsContract = createContractGetter(Celostrials__factory)
export const getCarbonizedCollectionContract = createContractGetter(
  CarbonizedCollection__factory,
)

export const getCarbonizerContract = async (
  address: string,
  signer: Signer | Provider,
): Promise<Carbonizer> => {
  return Carbonizer__factory.connect(address, signer)
}
