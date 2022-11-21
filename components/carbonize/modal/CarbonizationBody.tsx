import {
  HStack,
  Box,
  Center,
  Button,
  VStack,
  Skeleton,
  Stack,
  AspectRatio,
  Image,
  Text,
} from "@chakra-ui/react"
import {
  ApprovalState,
  useApproveCelostrials,
} from "../../../hooks/useApproveCelostrials"
import { config } from "../../../config/config"
import { useCelo } from "@celo/react-celo"
import { useIsMounted } from "../../../hooks/useIsMounted"
import { useEffect, useState } from "react"
import { Divider } from "@chakra-ui/react"
import { CurrencyInput } from "../input/index"
import { CeloGlyph } from "../../Icon"
import { useCarbonize } from "../../../hooks/useCarbonize"

export const CarbonizationBody = ({
  tokenId,
  setFetched,
}: {
  tokenId: string
  setFetched: (val: boolean) => void
}) => {
  const url = "https://celostrials.s3.us-west-2.amazonaws.com/"
  const isMounted = useIsMounted()
  const [celo, setCelo] = useState("")
  const [celoBalance, setCeloBalance] = useState("")
  const { address, getConnectedKit } = useCelo()

  const {
    approve: approveCelostrials,
    approving: approvingCelostrials,
    approvalState: approvalStateCelostrials,
  } = useApproveCelostrials(config.CARBONIZED_ADDRESS)

  const { carbonize, carbonizing } = useCarbonize()

  useEffect(() => {
    const helper = async () => {
      if (!address) return
      const kit = await getConnectedKit()
      const celoBN = await (await kit.getTotalBalance(address)).CELO
      if (celoBN)
        setCeloBalance((celoBN?.toNumber() / Math.pow(10, 18)).toFixed(2))
    }
    if (address) helper()
  }, [address])

  let button = (
    <Button
      w="100%"
      color="black"
      className="carbonize-button"
      onClick={async () => {
        await carbonize(Number(tokenId), Number(celo))
        setFetched(false)
      }}
      isLoading={carbonizing}
      loadingText={"Carbonizing"}
    >
      {"Carbonize"}
    </Button>
  )
  if (
    address &&
    isMounted &&
    approvalStateCelostrials !== ApprovalState.APPROVED
  ) {
    button = (
      <Button
        w="100%"
        variant="solid"
        colorScheme="primary"
        onClick={approveCelostrials}
        isLoading={
          approvalStateCelostrials === ApprovalState.PENDING ||
          approvingCelostrials
        }
        loadingText="Approving"
      >
        Approve Celostrials
      </Button>
    )
  }

  return (
    <Box p="1em !important" mt={4} h="auto" w="full" borderRadius="8px">
      <VStack p="1em !important">
        <AspectRatio w="100%" mb="1em" maxW="20em" ratio={1}>
          <>
            <Image
              draggable={false}
              userSelect="none"
              src={`${url}${tokenId}.png`}
              objectFit="cover"
              borderRadius="2em"
              alt={"alien"}
            />
          </>
        </AspectRatio>
        {approvalStateCelostrials === ApprovalState.APPROVED ? (
          <VStack p="1em" borderRadius={"lg"} bgColor="#242424">
            <HStack>
              <CeloGlyph w="2em" h="2em" />
              <VStack>
                <CurrencyInput onInput={(e) => setCelo(e)} value={celo} />
                <Text
                  ml="1em !important"
                  color="white"
                  alignSelf={"flex-start"}
                  opacity=".5"
                >
                  balance: {celoBalance}
                </Text>
              </VStack>
            </HStack>
          </VStack>
        ) : (
          <Stack w="100%" opacity=".1">
            <Skeleton h="2em" />
            <Skeleton h="2em" />
            <Skeleton h="2em" />
          </Stack>
        )}
      </VStack>
      <Center p={1} alignItems="center" mx={2}></Center>
      <VStack w="100%" mt="1em">
        {button}
      </VStack>
    </Box>
  )
}
