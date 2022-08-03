import { VStack, Stack, Image, Text, Link, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"

export const CarbonizeInfo = () => {
  const router = useRouter()

  return (
    <Stack
      direction={{ md: "row", base: "column" }}
      mt="2em"
      w="100%"
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
      </VStack>
      <VStack minW="20em" alignSelf={{ md: "initial", base: "center" }}>
        <Image
          src={"/images/carbonized2.gif"}
          borderRadius="1em"
          maxW="22em"
          alt={"alien1"}
        />
      </VStack>
    </Stack>
  )
}
