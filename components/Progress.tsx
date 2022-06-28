import { Flex, Progress, ProgressProps, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useCountdown } from "../hooks/useCountdown"

interface CountdownProps extends ProgressProps {
  duration: number
}

export const ProgressCountdown = ({ duration, ...rest }: CountdownProps) => {
  const count = useCountdown({
    duration: duration,
    interval: 100,
    isIncrement: false,
  })

  return (
    <Flex flexDirection="row" width="100%" m={0} p={0}>
      <Progress max={duration} value={count} w="90%" {...rest} />
    </Flex>
  )
}
