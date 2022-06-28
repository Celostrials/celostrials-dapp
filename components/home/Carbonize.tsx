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
import { faCubes } from "@fortawesome/free-solid-svg-icons"
import colors from "../../styles/theme/foundations/colors"

export const Carbonize = () => {
  return (
    <Stack
      direction={{ md: "row", base: "column" }}
      mt="2em"
      align="flex-start"
      pt="4"
      justifyContent="space-between"
    >
      <VStack alignItems="flex-start" maxW="35em">
        <Heading
          lineHeight="1em"
          fontSize="40px"
          fontWeight="extrabold"
          fontStyle="italic"
        >
          CARBONIZE YOUR CELOSTRIAL
        </Heading>
        <Text fontSize="md">
          In partnership with Celo and Toucan, Celostrial holders are able to
          carbonize their alien collection to earn climate activity rewards!
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
          </Link>
          .
        </Text>
        <Center
          my={{ md: "6em !important", base: "3em !important" }}
          alignSelf="center"
        >
          {/* <Button
            my="2em !important"
            w={{ md: "initial", base: "20em" }}
            variant="solid"
            colorScheme="primary"
            textDecoration="none !important"
            rightIcon={<FontAwesomeIcon icon={faCubes} />}
          >
            Carbonize
          </Button> */}
          <Heading
            lineHeight="1em"
            fontSize={{ md: "40px", base: "38px" }}
            fontWeight="extrabold"
            fontStyle="italic"
            color={colors.orange.dark}
          >
            COMING SOON...
          </Heading>
        </Center>
      </VStack>
      <VStack minW="20em" alignSelf={{ md: "initial", base: "center" }}>
        <Image
          src={"images/carbonized2.gif"}
          borderRadius="1em"
          maxW="21em"
          alt={"alien1"}
        />
      </VStack>
    </Stack>
  )
}
