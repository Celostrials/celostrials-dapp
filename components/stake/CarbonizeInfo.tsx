import {
  VStack,
  Stack,
  Image,
  Text,
  Link,
  OrderedList,
  Heading,
  ListItem,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { config } from "../../config"
import { useMintCarbon } from "../../hooks/useMintCarbon"
import { Button } from "@chakra-ui/button"

export const CarbonizeInfo = () => {
  const router = useRouter()

  const { onMintCarbon, loading } = useMintCarbon()

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
          Greetings and welcome to the Celostrials Carbonizer. Here you will be
          able to carbonize your collection and earn rewards for partaking in
          alternative climate action.
        </Text>
        <Text pt="1em" fontSize="md">
          <Text fontSize="md" fontStyle="italic">
            HOW TO:
          </Text>
          <OrderedList>
            <ListItem>
              Mint your very own Celostrial{" "}
              <Link fontWeight="extrabold" onClick={() => router.push("/")}>
                here
              </Link>
              .
            </ListItem>
            <ListItem>
              Aquire some NCT carbon credits at{" "}
              <Link
                fontWeight="extrabold"
                href="https://app.uniswap.org/#/swap?chain=celo"
                target="_blank"
              >
                Uniswap
              </Link>{" "}
              or{" "}
              <Link
                fontWeight="extrabold"
                href="https://app.ubeswap.org/#/swap"
                target="_blank"
              >
                Ubeswap
              </Link>
              .
            </ListItem>
            <ListItem>
              In the section bellow, select the aliens you wish to carbonize
              then click the {'"'}carbonize{'"'} button.
            </ListItem>
            <ListItem>
              Sign the {'"'}Approve Carbon{'"'} and {'"'}Approve Celostrials
              {'"'} transactions.
            </ListItem>
            <ListItem>
              Input a valid amount of NCT, and sign the carbonize transaction.
            </ListItem>
          </OrderedList>
          <Text pt="2em" fontSize="md">
            All carbonized aliens automatically receive climate action rewards
            that you can claim by clicking the {'"'}Rewards{'"'} button.
          </Text>
        </Text>
        {config.NETWORK_NAME !== "celo" && (
          <Button
            w={{ md: "initial", base: "100%" }}
            variant="outline"
            colorScheme="primary"
            onClick={async () => {
              await onMintCarbon()
            }}
            isLoading={loading}
          >
            Mint Test Carbon
          </Button>
        )}
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
