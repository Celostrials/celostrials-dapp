import { Alfajores, Localhost, Mainnet } from "@celo-tools/use-contractkit"
import { CeloProvider } from "@celo/react-celo"
import "@celo/react-celo/lib/styles.css"
import "@fontsource/museomoderno/400.css"
import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "react-query"
import { Popups } from "../components"
import { Updater } from "../components/Updater"
import { Layout } from "../layouts"
import "../styles/index.css"
import { ThemeProvider } from "../styles/theme"
import { config } from "../config"
import { Heading } from "@chakra-ui/react"

const client = new QueryClient()

const Main = ({ Component, pageProps }: AppProps) => {
  let network
  switch (config.NETWORK_NAME) {
    case "celo":
      network = Mainnet
      break
    case "celo-alfajores":
      network = Alfajores
      break
    default:
      network = { ...Localhost, chainId: 31337 }
  }

  return (
    <ThemeProvider>
      <CeloProvider
        dapp={{
          name: "Celostrials",
          icon: "",
          description:
            "Undercollateralized Mutual Credit On The Celo Blockchain",
          url: "https://celostrials.com",
        }}
        theme={{
          primary: "white",
          secondary: "#ff8802",
          text: "white",
          textSecondary: "rgba(255, 255, 255, 0.83)",
          textTertiary: "rgba(255, 255, 255, 0.67)",
          muted: "rgba(255, 255, 255, 0.33)",
          background: "#181818",
          error: "#F27D7D",
        }}
        connectModal={{
          title: <span>Connect a wallet</span>,
          providersOptions: {
            searchable: false,
          },
          reactModalProps: {
            overlayClassName: "ReactModal__Overlay_Celostrials",
          },
        }}
        networks={[network]}
        network={network}
      >
        <QueryClientProvider client={client}>
          <Updater />
          <Popups />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </CeloProvider>
    </ThemeProvider>
  )
}

export default Main
