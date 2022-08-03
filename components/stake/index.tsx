import {
  Flex,
  VStack,
  Container,
  HStack,
  Image,
  Center,
} from "@chakra-ui/react"
import { LOGOTYPE } from "../../public/images"
import { Divider } from "@chakra-ui/react"
import { CarbonizeInfo } from "./CarbonizeInfo"
import { Collection } from "./Collection"

export const CarbonCards = () => {
  return (
    <Flex width="100%" color="white" align="center" flexDir="column">
      <VStack width="100%">
        <Container maxW="container.lg" id="mint">
          <Center mt="5em">
            <Image
              minW={"15em"}
              src={"/images/carbonize.png"}
              alt={"carbonize"}
              w="40em"
            />
          </Center>
          <HStack w="100%" mb="3em">
            <CarbonizeInfo />
          </HStack>
          <Divider />
          <Collection />
        </Container>
      </VStack>
    </Flex>
  )
}
