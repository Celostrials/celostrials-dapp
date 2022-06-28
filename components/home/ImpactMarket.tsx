import {
  VStack,
  Stack,
  Image,
  Text,
  Spacer,
  Heading,
  Button,
} from "@chakra-ui/react"
import colors from "../../styles/theme/foundations/colors"
import { useBreakpointValue, Link } from "@chakra-ui/react"

export const ImpactMarket = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <VStack align="flex-start" pt="4" justifyContent="space-between">
      <Stack
        direction={{ md: "row", base: "column" }}
        alignItems="center"
        backgroundColor={colors.orange.dark}
        mt="5em"
        mb={{ md: "5em", base: "0" }}
      >
        <VStack>
          <Heading
            textAlign={{ md: "initial", base: "center" }}
            whiteSpace={{ md: "nowrap", base: "initial" }}
            m=".5em"
            mb={"0"}
            fontSize="40px"
            color="black"
            fontWeight="extrabold"
            fontStyle="italic"
          >
            IMPACT MARKET
          </Heading>
          <Link href="https://www.impactmarket.com/" target="_blank">
            <Button
              hidden={isMobile ? true : false}
              mb="1em !important"
              variant="solid"
              colorScheme="black"
              w="10em"
              color={colors.orange.dark}
              textDecoration="none !important"
            >
              $PACT
            </Button>
          </Link>
        </VStack>
        <Text
          fontSize="md"
          color="black"
          alignSelf="center"
          m="1.5em !important"
          mt={{ md: "initial.5em", base: "0 !important" }}
        >
          5% of the mint funds go to eradicating poverty around the world via
          the Impact Market{`'`}s decentralized poverty alleviation protocol.
        </Text>
        <Link href="https://www.impactmarket.com/" target="_blank">
          <Button
            hidden={isMobile ? false : true}
            mb="1em !important"
            variant="solid"
            colorScheme="black"
            w="10em"
            color={colors.orange.dark}
            textDecoration="none !important"
          >
            $PACT
          </Button>
        </Link>
      </Stack>
      <Stack
        direction={{ md: "row", base: "column" }}
        mt="3em"
        w="100%"
        align="flex-start"
        pt="4"
        justifyContent="space-between"
      >
        <VStack alignItems="flex-start" maxW="35em" mt="3em" mr=".5em">
          <Heading fontSize="40px" fontWeight="extrabold" fontStyle="italic">
            SPECS
          </Heading>
          <Text fontSize="md">
            Each Celostrial is unique and programmatically generated from over
            210 possible traits, including expressions, headwear, clothing, and
            more.
          </Text>
          <Text fontSize="md">
            The Celostrials are stored as ERC-721 tokens on the Celo blockchain
            and hosted on IPFS. You can mint your very own alien for 3 CELO.
          </Text>
        </VStack>
        <VStack minW={{ md: "20em", base: "100%" }}>
          <Image
            src={"images/preview.gif"}
            borderRadius="1em"
            maxW={{ md: "21em", base: "100%" }}
            alt={"alien1"}
          />
        </VStack>
      </Stack>
      <Spacer id="roadmap" />
    </VStack>
  )
}
