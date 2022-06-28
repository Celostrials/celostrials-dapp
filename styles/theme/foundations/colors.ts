const purple = {
  light: "#B79CED",
  main: "#957FEF",
  dark: "#7161EF",
  soft: "#EAE5FC",
  variantSoft: "#E3DFFC",
  softTransparent: "rgba(234, 229, 252, 0.25)",
  lightTransparent: "rgba(183, 156, 237, 0.5)",
  70: "#694AEB",
}

const purpleAlpha = {
  50: "rgba(149, 127, 239, 0.05)",
  100: "rgba(149, 127, 239, 0.10)",
  200: "rgba(149, 127, 239, 0.17)",
  300: "rgba(149, 127, 239, 0.33)",
  500: "rgba(149, 127, 239, 0.5)",
  700: "rgba(149, 127, 239, 0.67)",
  800: "rgba(149, 127, 239, 0.83)",
  900: "rgba(149, 127, 239, 0.9)",
}

const pinkAlpha = {
  100: "rgba(237, 130, 226, 0.1)",
  200: "rgba(237, 130, 226, 0.17)",
  300: "rgba(237, 130, 226, 0.33)",
  500: "rgba(237, 130, 226, 0.5)",
  700: "rgba(237, 130, 226, 0.67)",
  800: "rgba(237, 130, 226, 0.83)",
  900: "rgba(237, 130, 226, 0.9)",
}

const orange = {
  light: "#ff8802",
  main: "#ff8802",
  dark: "#ff8802",
}

const orangeAlpha = {
  100: "rgba(245, 200, 122, 0.10)",
  200: "rgba(245, 200, 122, 0.17)",
  300: "rgba(245, 200, 122, 0.33)",
  500: "rgba(245, 200, 122, 0.5)",
  700: "rgba(245, 200, 122, 0.67)",
  800: "rgba(245, 200, 122, 0.83)",
  900: "rgba(245, 200, 122, 0.9)",
}

const blue = {
  50: "#709BFF",
  dark: "#3772FF",
  main: "#699DFF",
  soft: "#D7E3FF",
  variantSoft: "#E1EBFF",
}

const blueAlpha = {
  100: "rgba(112, 155, 255, 0.1)",
  200: "rgba(112, 155, 255, 0.17)",
  300: "rgba(112, 155, 255, 0.33)",
  500: "rgba(112, 155, 255, 0.5)",
  700: "rgba(112, 155, 255, 0.67)",
  800: "rgba(112, 155, 255, 0.83)",
  900: "rgba(112, 155, 255, 0.9)",
}

const green = {
  main: "#0A8754",
  500: "#0A8754",
}

const greenAlpha = {
  100: "rgba(134, 233, 154, 0.1)",
  200: "rgba(134, 233, 154, 0.17)",
  300: "rgba(134, 233, 154, 0.33)",
  500: "rgba(134, 233, 154, 0.5)",
  700: "rgba(134, 233, 154, 0.67)",
  800: "rgba(134, 233, 154, 0.83)",
  900: "rgba(134, 233, 154, 0.9)",
}

const red = {
  main: "#FF3C38",
  alert: "#E92A2A",
  500: "#FF3C38",
}

const redAlpha = {
  100: "rgba(242, 125, 125, 0.1)",
  200: "rgba(242, 125, 125, 0.17)",
  300: "rgba(242, 125, 125, 0.33)",
  500: "rgba(242, 125, 125, 0.5)",
  700: "rgba(242, 125, 125, 0.67)",
  800: "rgba(242, 125, 125, 0.83)",
  900: "rgba(242, 125, 125, 0.9)",
}

const gray = {
  main: "#595959",
  cultured: "#F2F2F2",
  gainsboro: "#D9D9D9",
  cement: "#BDBDBD",
  battleship: "#8C8C8C",
  davys: "#595959",
  20: "#DBDBDB",
  40: "#A8A8A8",
  80: "#424242",
  90: "#292929",
  100: "#F2F2F2",
  300: "#D9D9D9",
  500: "#BDBDBD",
  700: "#8C8C8C",
  900: "#595959",
}

const charcoal = {
  main: "#303032",
  200: "#bebebf",
  300: "#a4a4a4",
  400: "#8a8a8a",
  500: "#707070",
  600: "#575758",
  700: "#3e3e3f",
  800: "#252527",
}

const black = {
  main: "#000000",
  dark: "#181818",
  blur: "#000000ab",
}

const colors = {
  primary: orange,
  secondary: orange,
  alternate: blue,
  gray: gray,
  black: black,
  alert: {
    error: red.main,
    success: green.main,
  },
  charcoal,
  purple,
  purpleAlpha,
  pinkAlpha,
  orange,
  orangeAlpha,
  green,
  greenAlpha,
  blue,
  blueAlpha,
  red,
  redAlpha,
}

export const gradients = {
  primary: "linear-gradient(260.01deg, #ff0c0c 0%, #ff8e01 100%);",
  primaryTransparent:
    "linear-gradient(260.01deg, #ff0c0c61 0%, #ff8e01b3 100%)",
  blue: "linear-gradient(225deg, #8bb3ff 0.39%, #1c5efa 100.39%);",
} as Record<string, string>

export default colors
