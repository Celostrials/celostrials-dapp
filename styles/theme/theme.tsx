import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react"
import components from "./components"
import foundations from "./foundations"
import { styles as globalStyles } from "./styles"
import { textStyles } from "./textStyles"
import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import "@fontsource/montserrat/900.css"
import "@fontsource/montserrat/600.css"

const overrides: any = {
  ...foundations,
  components,
  styles: globalStyles,
  textStyles,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
}

export const theme = extendTheme(overrides)

const EmotionCacheProvider = ({ children }: { children: any }) => {
  const cache = createCache({ key: "csp" })
  return <CacheProvider value={cache}>{children}</CacheProvider>
}

export const ThemeProvider = ({ children }: { children: any }) => {
  return (
    <EmotionCacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </EmotionCacheProvider>
  )
}
