import { Center, Button, Icon as ChakraIcon } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  VStack,
  Stack,
  Image,
  Text,
  Link,
  HStack,
  Heading,
} from "@chakra-ui/react"
import { faCubes } from "@fortawesome/free-solid-svg-icons"
import colors from "../../styles/theme/foundations/colors"
import { useRouter } from "next/router"

export const Carbonize = () => {
  const router = useRouter()

  return (
    <Stack
      direction={{ md: "row", base: "column" }}
      mt="2em"
      align="flex-start"
      pt="4"
      justifyContent="space-between"
    >
      <VStack alignItems="flex-start" maxW={{ md: "35em", base: "100%" }}>
        <Heading
          lineHeight="1em"
          fontSize="40px"
          fontWeight="extrabold"
          fontStyle="italic"
        >
          CARBONIZE YOUR CELOSTRIAL
        </Heading>
        <Text fontSize="md">
          Celostrial holders are able to carbonize their collection by staking
          Celo onto each of their NFTs. The more Celo staked, the more carbon is
          removed from the atmosphere. Carbonized NFTs then compete in carbon
          competitions for climate activity rewards that are given at random to
          the top Carbonizers in a given period.
        </Text>
        <Text fontSize="md">
          To learn more about the carbon extraction market and how you can take
          action to fight climate change, head over to{" "}
          <Link
            fontWeight="extrabold"
            href="https://toucan.earth/"
            target="_blank"
          >
            toucan.earth
          </Link>{" "}
          and{" "}
          <Link
            fontWeight="extrabold"
            href="https://www.spirals.so/"
            target="_blank"
          >
            spirals.so
          </Link>
          .
        </Text>
        <Center
          w="100%"
          my={{ md: "0 !important", base: "3em !important" }}
          alignSelf="center"
        >
          <Link
            onClick={() => router.push("/carbon")}
            w={"100%"}
            _active={{ boxShadow: "none" }}
            _focus={{ boxShadow: "none" }}
            _hover={{ textDecoration: "none" }}
          >
            <Button
              my="2em !important"
              w="100%"
              variant="solid"
              colorScheme="primary"
              textDecoration="none !important"
              size="lg"
              rightIcon={<FontAwesomeIcon icon={faCubes} />}
              borderRadius="10em"
            >
              CARBONIZE
            </Button>
          </Link>
        </Center>
      </VStack>
      <VStack minW="20em" alignSelf={{ md: "initial", base: "center" }}>
        <Image
          src={"images/carbonized_preview.gif"}
          borderRadius="1em"
          maxW="21em"
          alt={"alien1"}
        />
      </VStack>
    </Stack>
  )
}
