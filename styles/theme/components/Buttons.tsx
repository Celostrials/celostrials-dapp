import { Dict } from "../utils/types"

export const Button = {
  baseStyle: {
    lineHeight: "100%",
    fontWeight: "semibold",
    borderRadius: "xl",
    letterSpacing: "wide",
  },
  sizes: {
    lg: {
      h: "auto",
      fontSize: "lg",
      px: "24px",
      py: "16px",
    },
    md: {
      h: "auto",
      fontSize: "md",
      px: "20px",
      py: "14px",
    },
    sm: {
      h: "auto",
      fontSize: "sm",
      px: "16px",
      py: "12px",
    },
    xs: {
      h: "auto",
      fontSize: "xs",
      px: "12px",
      py: "10px",
    },
  },

  variants: {
    solid: (props: Dict) => ({
      color: props.colorMode === "light" ? "white" : "black",
      transition: "0.5s",
      bg: "purple.500",
      boxShadow: props.colorMode === "light" ? "inner-base-dark" : "inner-base",
      _hover: {
        bg: props.colorMode === "light" ? "purple.600" : "purple.400",
        boxShadow: props.colorMode === "light" ? "lg" : "lg-dark",
      },
      _focus: {
        bg: props.colorMode === "light" ? "purple.600" : "purple.400",
        boxShadow: props.colorMode === "light" ? "lg" : "lg-dark",
      },
      _active: {
        transition: "0s",
        bg: props.colorMode === "light" ? "purple.400" : "purple.600",
        boxShadow: "inner",
      },
    }),

    outline: (props: Dict) => ({
      borderStyle: "solid",
      borderWidth: "1px",
      transition: "0.5s",
      bg: "transparent",
      color: "purple.500",
      borderColor: "purple.500",
      _hover: {
        bg: props.colorMode === "light" ? "purple.100" : "purple.900",
        color: props.colorMode === "light" ? "purple.600" : "purple.400",
        borderColor: props.colorMode === "light" ? "purple.600" : "purple.400",
      },
      _focus: {
        bg: props.colorMode === "light" ? "purple.100" : "purple.900",
        color: props.colorMode === "light" ? "purple.600" : "purple.400",
        borderColor: props.colorMode === "light" ? "purple.600" : "purple.400",
        boxShadow: "none",
      },
      _active: {
        transition: "0s",
        bg: "transparent",
        color: props.colorMode === "light" ? "purple.400" : "purple.600",
        borderColor: props.colorMode === "light" ? "purple.400" : "purple.600",
        boxShadow: "inner",
      },
    }),

    ghost: (props: Dict) => ({
      bg: "transparent",
      color: props.colorMode === "light" ? "gray.700" : "gray.300",
      transition: "0.5s",
      _hover: {
        bg: props.colorMode === "light" ? "gray.150" : "gray.95",
        color: props.colorMode === "light" ? "black" : "white",
      },
      _focus: {
        bg: props.colorMode === "light" ? "gray.200" : "gray.900",
        color: props.colorMode === "light" ? "black" : "white",
        boxShadow: "none",
      },
      _active: {
        bg: "transparent",
        color: props.colorMode === "light" ? "black" : "white",
        transition: "0s",
      },
      _expanded: {
        bg: props.colorMode === "light" ? "gray.150" : "gray.95",
        color: props.colorMode === "light" ? "black" : "white",
      },
    }),

    link: (props: Dict) => ({
      color: "purple.500",
      transition: "0.5s",
      textDecoration: "none",
      _hover: {
        color: props.colorMode === "light" ? "purple.600" : "purple.400",
        textDecoration: "none",
      },
      _focus: {
        color: props.colorMode === "light" ? "purple.600" : "purple.400",
        boxShadow: "none",
        textDecoration: "none",
      },
      _active: {
        color: props.colorMode === "light" ? "purple.400" : "purple.600",
        textDecoration: "none",
        transition: "0s",
      },
    }),

    "external-link": (props: Dict) => ({
      fontWeight: "normal",
      color: "blue.500",
      transition: "0.5s",
      textDecoration: "none",
      p: 0,
      _hover: {
        color: props.colorMode === "light" ? "blue.600" : "blue.400",
        textDecoration: "none",
      },
      _focus: {
        color: props.colorMode === "light" ? "blue.600" : "blue.400",
        boxShadow: "none",
        textDecoration: "none",
      },
      _active: {
        color: props.colorMode === "light" ? "blue.400" : "blue.600",
        textDecoration: "none",
        transition: "0s",
      },
    }),
  },
}

export default Button
