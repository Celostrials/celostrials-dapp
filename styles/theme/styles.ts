import { Styles } from "@chakra-ui/theme-tools"

export const styles: Styles = {
  global: ({ colorMode }) => ({
    "html, #__next": {
      height: "100%",
    },
    "html, body": {
      width: "100vw",
      height: "100vh",
    },
    _focusVisible: {
      boxShadow: "0 0 0 3px #d8b2ff !important",
    },
  }),
}
