import { UseToastOptions } from "@chakra-ui/react"
import { standaloneToast } from "./createStandaloneToast"

export const showConnectWalletToast = (options?: UseToastOptions | undefined) => {
  standaloneToast({
    status: "error",
    title: "Wallet not connected",
    description: "Please connect your wallet with MetaMask.",
    ...options,
  })
}

export const showMetaMaskNotFoundToast = (options?: UseToastOptions | undefined) => {
  standaloneToast({
    status: "error",
    title: "MetaMask extension not found",
    description: "Please install MetaMask to use this app.",
  })
}
