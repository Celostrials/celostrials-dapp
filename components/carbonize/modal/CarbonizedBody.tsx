import {
  HStack,
  Image,
  Box,
  Center,
  Button,
  VStack,
  AspectRatio,
  Text,
  Stack,
  Divider,
  Spinner,
} from "@chakra-ui/react"
import { useCelo, useConnectedSigner } from "@celo/react-celo"
import { useIsMounted } from "../../../hooks/useIsMounted"
import { useState, useEffect } from "react"
import { CeloGlyph } from "../../Icon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { useDecarbonize, DecarbonizeState } from "../../../hooks/useDecarbonize"
import { useCarbonizedContract } from "../../../hooks/useCarbonizedContract"
import { Carbonizer__factory } from "../../../types"
import { formatEther } from "ethers/lib/utils"
import { CurrencyInput } from "../input"
import { useCarbonize } from "../../../hooks/useCarbonize"

export const CarbonizedBody = ({
  tokenId,
  onClose,
}: {
  tokenId: string
  onClose: () => void
}) => {
  const url = "https://celostrials-carbonized.s3.amazonaws.com/"
  const isMounted = useIsMounted()
  const { address, getConnectedKit } = useCelo()
  const carbonizedCollection = useCarbonizedContract()
  const signer = useConnectedSigner()
  const [carbonRetired, setCarbonRetired] = useState("")
  const [deposit, setDeposit] = useState(0)
  const [isCarbonizing, setIsCarbonizing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [celoBalance, setCeloBalance] = useState("")
  const [celo, setCelo] = useState("")

  const { carbonize, carbonizing } = useCarbonize()

  const {
    decarbonize,
    withdraw,
    withdrawing,
    decarbonizing,
    decarbonizeState,
    hoursLeft,
    withdrawalAmount,
  } = useDecarbonize(tokenId)

  const fetchData = async () => {
    if (!signer) return
    setLoading(true)
    const carbonizer = Carbonizer__factory.connect(
      await carbonizedCollection.carbonizer(Number(tokenId)),
      signer,
    )

    const result = await fetch(
      `https://app.spirals.so/api/impact/${carbonizer.address}`,
      {
        method: "GET",
        headers: {
          "x-api-key":
            "c65231491330ecbd6c59a15a2c11171ed01d2ba5b971d7bded29f4faa8097699",
        },
      },
    )
    if (!result) return
    const json = await result.json()
    const _TC02 = json.user.altUnits.TC02
    console.log(json)
    setCarbonRetired(_TC02)
    setDeposit(Number(formatEther(await carbonizer.getDeposit())))
    setLoading(false)
  }

  useEffect(() => {
    if (carbonizedCollection) fetchData()
  }, [carbonizedCollection, signer])

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

  let decarbonizationButton = (
    <Button
      w="100%"
      variant="outline"
      color="white"
      borderColor={"white"}
      onClick={async () => {
        await decarbonize(tokenId)
        await fetchData()
      }}
      isLoading={decarbonizeState === DecarbonizeState.UNKNOWN || decarbonizing}
      loadingText={"Decarbonizing"}
    >
      Decarbonize
    </Button>
  )
  if (
    address &&
    isMounted &&
    decarbonizeState == DecarbonizeState.DECARBONIZING
  ) {
    decarbonizationButton = (
      <Button
        w="100%"
        color="white"
        borderColor={"white"}
        variant="outline"
        disabled={true}
        isLoading={true}
        loadingText={"Decarbonizing"}
      />
    )
  } else if (
    address &&
    isMounted &&
    decarbonizeState === DecarbonizeState.DECARBONIZED
  ) {
    decarbonizationButton = (
      <Button
        w="100%"
        variant="outline"
        color="white"
        borderColor={"white"}
        onClick={async () => {
          await withdraw(tokenId)
          await fetchData()
          await onClose()
        }}
        isLoading={withdrawing}
        loadingText="Withdrawing"
      >
        Withdraw
      </Button>
    )
  }

  return (
    <Box p="1em !important" mt={4} h="auto" w="full" borderRadius="8px">
      <VStack>
        <AspectRatio w="100%" mb="1em" maxW="20em" ratio={1}>
          <>
            <Image
              draggable={false}
              userSelect="none"
              src={`${url}${tokenId}.gif`}
              objectFit="cover"
              borderRadius="2em"
              alt={"alien"}
            />
          </>
        </AspectRatio>
        <VStack
          w="100%"
          minH={"15em"}
          p="1em"
          borderRadius={"lg"}
          bgColor="#242424"
          justifyContent={"center"}
        >
          {loading ? (
            <Spinner color="white" />
          ) : (
            <>
              <VStack>
                <HStack>
                  <Stack>
                    <Image
                      filter="drop-shadow(3px -2px 0 white) drop-shadow(-3px -2px 0 white) drop-shadow(0px 4px 0 white)"
                      alt="NCT.png"
                      src="/images/NCT.png"
                      w="2em"
                    />
                  </Stack>
                  <Text fontSize="40px" color="white">
                    {carbonRetired || 0}
                  </Text>
                </HStack>
                <Text
                  mt="-.5em !important"
                  fontWeight={"medium"}
                  color="white"
                  fontSize={"large"}
                >
                  tons of carbon retired
                </Text>
              </VStack>
              <Divider mt="1.5em !important" />
              <VStack>
                <HStack>
                  <CeloGlyph w="2em" h="2em" />
                  <Text fontSize="40px" color="white">
                    {decarbonizeState === DecarbonizeState.DECARBONIZED ||
                    decarbonizeState === DecarbonizeState.DECARBONIZING
                      ? withdrawalAmount
                      : deposit}
                  </Text>
                </HStack>
                <Text
                  mt="-.5em !important"
                  fontWeight={"medium"}
                  color="white"
                  fontSize={"large"}
                >
                  deposited
                </Text>
              </VStack>
            </>
          )}
        </VStack>
        {isCarbonizing && (
          <VStack p="1em" borderRadius={"lg"} bgColor="#242424">
            <Text alignSelf={"flex-start"} color="white" fontSize={"large"}>
              Deposit
            </Text>
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
        )}
      </VStack>
      <Center p={1} alignItems="center" mx={2}></Center>
      <VStack mt="1em">
        <HStack w="100%">
          <Button
            w="100%"
            color="black"
            className="carbonize-button"
            onClick={async () => {
              if (!isCarbonizing) return setIsCarbonizing(true)
              setIsCarbonizing(false)
              await carbonize(Number(tokenId), Number(celo))
              await fetchData()
            }}
            isDisabled={decarbonizeState === DecarbonizeState.DECARBONIZING}
            isLoading={
              decarbonizeState === DecarbonizeState.UNKNOWN || carbonizing
            }
            loadingText={"Carbonizing"}
          >
            Carbonize
          </Button>
          {decarbonizationButton}
        </HStack>
        <Text opacity=".7" color="white" fontSize="14px">
          {decarbonizeState === DecarbonizeState.CARBONIZED && (
            <>
              72 hour decarbonization period before withdraw is available{" "}
              <FontAwesomeIcon icon={faInfoCircle} />
            </>
          )}
          {decarbonizeState === DecarbonizeState.DECARBONIZING && (
            <>
              {hoursLeft} hour{hoursLeft > 1 ? "s" : ""} left
            </>
          )}
        </Text>
      </VStack>
    </Box>
  )
}
