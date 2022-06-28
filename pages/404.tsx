/* eslint-disable jsx-a11y/alt-text */
import { Box, Center, Container, Heading } from "@chakra-ui/react"
import type { NextPage } from "next"

export const _404: NextPage = () => {
  return (
    <Box color="white">
      <title>Page not found</title>
      <Container py={4}>
        <Center minH="500px">
          <Heading fontSize={"xl"}>Page not found</Heading>
        </Center>
      </Container>
    </Box>
  )
}

export default _404
