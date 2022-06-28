import { useCelo, useGetConnectedSigner } from "@celo/react-celo"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { config } from "../config"
import { Celostrials, Celostrials__factory } from "../types"

export const useCelostrialsContract = () => {
  const getSigner = useGetConnectedSigner()
  const { address, network } = useCelo()

  const [contract, setContract] = useState<Celostrials | null>()

  useEffect(() => {
    async function loadBalance() {
      let signer
      if (address) {
        signer = await getSigner()
      } else {
        const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl)
        signer = new ethers.VoidSigner(
          "0x97597d6f7308281fe364c57d8492c058132281fa",
          provider,
        )
      }
      console.log(config)
      setContract(
        Celostrials__factory.connect(config.CELOSTRIALS_ADDRESS, signer),
      )
    }
    loadBalance()
  }, [address, getSigner, network])

  return {
    contract,
    mint: async (amount: number) => {
      if (address && contract) {
        const gas = await contract.estimateGas.mint(address, amount, {
          value: ethers.utils.parseEther(String(amount * 3)),
        })
        return contract.mint(address, amount, {
          value: ethers.utils.parseEther(String(amount * 3)),
          gasLimit: gas.mul(10),
        })
      }
    },
    getTotalSupply: async () => {
      if (contract) {
        return contract.totalSupply()
      }
    },
    getMaxSupply: async () => {
      if (contract) {
        return contract.maxSupply()
      }
    },
    onlyWhitelist: async () => {
      if (contract) {
        return contract.onlyWhitelist()
      }
    },
    isPaused: async () => {
      if (contract) {
        return contract.paused()
      }
    },
    isWhiteListed: async () => {
      if (contract) {
        return contract.isWhitelist()
      }
    },
  }
}
