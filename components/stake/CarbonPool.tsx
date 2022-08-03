import colors from "../../styles/theme/foundations/colors"
import {
  VStack,
  Image,
  SimpleGrid,
  Heading,
  Flex,
  AspectRatio,
} from "@chakra-ui/react"
import { useCelostrialsContract } from "../../hooks/useCelostrialsContract"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useCelo } from "@celo/react-celo"
import { ConnectButton } from "../account/ConnectButton"
import { Spinner, Stack } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

export const CarbonPool = () => {
  const url = "https://celostrials.s3.us-west-2.amazonaws.com/"
  const { walletOfOwner } = useCelostrialsContract()
  const [tokens, setTokens] = useState<string[]>()
  const [loading, setLoading] = useState(false)
  const { address, initialised } = useCelo()

  const isCarbonized = (id: string): boolean => {
    return true
  }

  useEffect(() => {
    async function loadBalance() {
      setLoading(true)
      const res = await walletOfOwner(address || "")
      console.log(res)
      setLoading(false)
      if (res) setTokens(res.map((id) => ethers.utils.formatUnits(id, "wei")))
    }
    if (initialised && walletOfOwner && !tokens && address) loadBalance()
  }, [initialised, address, walletOfOwner])

  return (
    <VStack
      mt="3em"
      backgroundColor="#ffffff1f"
      w="100%"
      p="2em"
      borderRadius="1em"
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Heading
            lineHeight="1em"
            fontSize="40px"
            fontWeight="extrabold"
            fontStyle="italic"
            mb=".5em"
            alignSelf="flex-start"
          >
            YOUR COLLECTION
          </Heading>
          {tokens && address && (
            <SimpleGrid w="100%" columns={{ md: 3, base: 1 }} spacing="2em">
              {tokens.map((id, index) => (
                <AspectRatio key="index" maxW="20em" ratio={1}>
                  <>
                    <Image
                      src={`${url}${id}.png`}
                      objectFit="cover"
                      borderRadius="1em"
                      alt={"alien"}
                    />
                    {isCarbonized(id) && (
                      <Stack
                        overflow="inherit !important"
                        justifyContent="flex-start !important"
                        alignItems="flex-end !important"
                        mt="-1em"
                      >
                        <FontAwesomeIcon
                          style={{ marginRight: "-20px" }}
                          size="3x"
                          icon={faCircle}
                          color="white"
                        />
                      </Stack>
                    )}
                  </>
                </AspectRatio>
              ))}
            </SimpleGrid>
          )}
          {!address && <ConnectButton />}
        </>
      )}
    </VStack>
  )
}
