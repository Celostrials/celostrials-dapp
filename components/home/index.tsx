import {
  Flex,
  Heading,
  VStack,
  Container,
  Center,
  Divider,
} from "@chakra-ui/react"
import Mint from "./Mint"
import { TotalMintedInfo } from "./TotalMinted"
import { Welcome } from "./Welcome"
import { Carbonize } from "./Carbonize"
import { ImpactMarket } from "./ImpactMarket"
import { CommunityTools } from "./CommunityTools"
import { Partnerships } from "./Partnerships"
import { Roadmap } from "./Roadmap"
import { FAQ } from "./FAQ"
import { HomeFooter } from "./HomeFooter"

export const HomeCards = () => {
  return (
    <Flex width="100%" color="white" align="center" flexDir="column">
      <VStack width="100%">
        <Container maxW="container.lg" id="mint">
          <Mint />
          <Divider
            mt="5em"
            mb="2em"
            borderColor="white"
            opacity="1"
            size="xl"
          />
          <Welcome />
          <Divider mt="3em" borderColor="white" opacity="1" size="xl" />
          <Carbonize />
          <ImpactMarket />
          <Divider mt="3em" borderColor="white" opacity="1" size="xl" />
          <Roadmap />
          <Divider mt="3em" borderColor="white" opacity="1" size="xl" />
          <CommunityTools />
          <Divider mt="3em" borderColor="white" opacity="1" size="xl" />
          <Partnerships />
          <FAQ />
          <HomeFooter />
        </Container>
      </VStack>
    </Flex>
  )
}
