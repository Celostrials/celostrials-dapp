import { Container, Flex, Heading, VStack, Button } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import { HomeCards } from "../components/home"

export const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Celostrials | Home</title>
      </Head>
      <Flex width="100%" justifyContent="center">
        <HomeCards />
      </Flex>
    </>
  )
}

export default HomePage
