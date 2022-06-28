import { Center, Button } from "@chakra-ui/react"
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
import { faBolt, faCompass, faCubes } from "@fortawesome/free-solid-svg-icons"
import colors from "../../styles/theme/foundations/colors"

export const CommunityTools = () => {
  return (
    <Stack direction={{ md: "row", base: "column" }}>
      <VStack alignItems="flex-start" mt="3em">
        <Heading fontSize="40px" fontWeight="extrabold" fontStyle="italic">
          COMMUNITY TOOLS
        </Heading>
        <HStack>
          <Text fontSize="md" alignSelf="center" w="100%" mr="2em">
            Here are a few tools the Celostrials community uses to help rank and
            manage their nfET inventory.
          </Text>
        </HStack>
      </VStack>
      <Stack
        direction={{ md: "column", base: "row" }}
        mt="2em !important"
        justifyContent="space-evenly"
      >
        <Link href="https://celostrials.vercel.app" target="_blank">
          <Button
            w="10em"
            variant="solid"
            colorScheme="primary"
            textDecoration="none !important"
            rightIcon={<FontAwesomeIcon icon={faBolt} />}
          >
            rarity tool
          </Button>
        </Link>
        <Link href="https://celotracker.com" target="_blank">
          <Button
            w="10em"
            variant="solid"
            colorScheme="primary"
            textDecoration="none !important"
            rightIcon={<FontAwesomeIcon icon={faCompass} />}
          >
            celotracker
          </Button>
        </Link>
      </Stack>
    </Stack>
  )
}
