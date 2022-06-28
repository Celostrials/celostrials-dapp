import { createStandaloneToast } from "@chakra-ui/react"
import { theme } from "../../styles/theme"

export const standaloneToast = createStandaloneToast({
  theme: theme,
  defaultOptions: {
    variant: "solid",
    isClosable: true,
    duration: 5000,
    position: "bottom-right",
  },
})
