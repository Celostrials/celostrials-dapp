import {
  Box,
  Stack,
  VStack,
  Image,
  Text,
  SimpleGrid,
  Spacer,
  Heading,
} from "@chakra-ui/react"

export const Welcome = () => {
  return (
    <>
      <Stack
        direction={{ md: "row", base: "column" }}
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
            WELCOME TO THE INVASION
          </Heading>
          <Text fontSize="md">
            Celosirials are an intergalactic collection of unique beings found
            exclusively on the Celo blockchain. Their features are
            algorithmically generated, resulting in an interstellar collectible
            completely unique to you!
          </Text>
          <Text fontSize="md">
            There will only ever be 10,000 Celostrials in our solar system so
            mint your own now!
          </Text>
          <Text fontSize="md">
            Be sure to follow our socials in order to stay up to date on the
            latest updates and giveaways.
          </Text>
        </VStack>
        <SimpleGrid
          w="100%"
          columns={2}
          spacing="2em"
          alignSelf={{ md: "initial", base: "center" }}
        >
          <Image
            src={"images/welcome_1.png"}
            borderRadius="1em"
            alt={"alien1"}
          />
          <Image
            src={"images/welcome_2.png"}
            borderRadius="1em"
            alt={"alien1"}
          />
          <Image
            src={"images/welcome_3.png"}
            borderRadius="1em"
            alt={"alien1"}
          />
          <Image
            src={"images/welcome_4.png"}
            borderRadius="1em"
            alt={"alien1"}
          />
        </SimpleGrid>
      </Stack>
      <Spacer id="carbonize" />
    </>
  )
}
