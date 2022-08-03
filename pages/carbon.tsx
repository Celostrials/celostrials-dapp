import { Container, Flex, Heading, VStack, Button } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { CarbonCards } from "../components/stake/index"

export const Carbon: NextPage = () => {
  return (
    <>
      <Head>
        <title>Celostrials | Carbon Staking</title>
      </Head>
      <Flex width="100%" justifyContent="center">
        <CarbonCards />
      </Flex>
    </>
  )
}

export default Carbon
