import React, { Children } from "react"

import {
  useStyleConfig,
  Text,
  Box,
  ButtonGroup,
  BoxProps,
} from "@chakra-ui/react"

interface CardProps extends BoxProps {
  variant?: string
  size?: string
}

export const Card = ({ variant, size, children, ...rest }: CardProps) => {
  const styles = useStyleConfig("Card", { variant, size })

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

export const CardHeader = ({ variant, size, children, ...rest }: CardProps) => {
  const styles = useStyleConfig("CardHeader", { variant, size })

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  )
}

export const CardTitle = ({ children, ...rest }: CardProps) => {
  return (
    <Text as="h3" size="3" mr="3" mb="2" {...rest}>
      {children}
    </Text>
  )
}

export const CardActions = ({ children, ...rest }: CardProps) => {
  if (Children.count(children) === 1) {
    return (
      <Box mb="2" {...rest}>
        {children}
      </Box>
    )
  }

  return (
    <ButtonGroup mb="2" {...rest}>
      {children}
    </ButtonGroup>
  )
}
