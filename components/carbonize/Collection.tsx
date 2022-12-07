import {
  VStack,
  Image,
  SimpleGrid,
  Heading,
  Button,
  AspectRatio,
  useDisclosure,
  Select,
  Text,
  Box,
} from "@chakra-ui/react"
import { useCelostrialsContract } from "../../hooks/useCelostrialsContract"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useCelo, useConnectedSigner } from "@celo/react-celo"
import { ConnectButton } from "../account/ConnectButton"
import { Spinner, Stack, HStack, Center, Divider } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCubes } from "@fortawesome/free-solid-svg-icons"
import { useCarbonizedContract } from "../../hooks/useCarbonizedContract"
import { CarbonizeModal } from "./modal/CarbonizeModal"
import { useRouter } from "next/router"
import { ethToString, weiToString } from "../../functions/bignumber"
import colors from "../../styles/theme/foundations/colors"

export const Collection = () => {
  const url = "https://celostrials.s3.us-west-2.amazonaws.com/"
  const router = useRouter()
  const { walletOfOwner } = useCelostrialsContract()
  const { walletOfOwner: carbonWalletOfOwner } = useCarbonizedContract()
  const [fetched, setFetched] = useState(false)
  const [selected, setSelected] = useState("")
  const [carbonized, setCarbonized] = useState<string[]>([])
  const [uncarbonized, setUncarbonized] = useState<string[]>([])
  const [filter, setFilter] = useState("ALL")
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [loading, setLoading] = useState(false)
  const { address, initialised } = useCelo()
  const signer = useConnectedSigner()

  const isCarbonized = (id: string): boolean => {
    return carbonized.some((carb) => carb === id)
  }

  const getTokens = (): string[] => {
    if (filter === "CARBONIZED") return carbonized.map((carb) => carb)
    if (filter === "UNCARBONIZED") return uncarbonized
    return [...carbonized.map((carb) => carb), ...uncarbonized].sort()
  }

  useEffect(() => {
    async function loadBalance() {
      setLoading(true)
      const _uncarbonized = await walletOfOwner(address || "")
      const _carbonized = await carbonWalletOfOwner(address || "")
      setLoading(false)
      setFetched(true)

      if (_carbonized) {
        setCarbonized(
          _carbonized[0].map((carb, index) => {
            return weiToString(carb)
          }),
        )
      }
      if (_uncarbonized)
        setUncarbonized(
          _uncarbonized.map((id) => ethers.utils.formatUnits(id, "wei")),
        )
    }
    if (initialised && !fetched) loadBalance()
  }, [initialised, address, walletOfOwner, carbonWalletOfOwner, fetched])

  useEffect(() => {
    if (!isOpen) {
      setSelected("")
      setFilter("ALL")
      setFetched(false)
    }
  }, [address, signer, isOpen])

  useEffect(() => {
    if (selected !== "") {
      onOpen()
    }
  }, [selected])

  return (
    <>
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
            <Stack
              direction={{ md: "row", base: "column" }}
              w="100%"
              mb="2em !important"
              justifyContent="space-between"
            >
              <VStack>
                <Heading
                  lineHeight="1em"
                  fontSize="40px"
                  fontWeight="extrabold"
                  fontStyle="italic"
                  alignSelf="flex-start"
                >
                  CARBONIZE YOUR COLLECTION
                </Heading>
                <Select
                  alignSelf="flex-start"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value)
                    setSelected("")
                  }}
                  backgroundColor="transparent !important"
                  w={{ md: "auto", base: "100%" }}
                >
                  <option value="ALL">All</option>
                  <option value="UNCARBONIZED">Uncarbonized Items</option>
                  <option value="CARBONIZED">Carbonized Items</option>
                </Select>
              </VStack>
            </Stack>
            {address && (
              <>
                {getTokens().length === 0 && (
                  <Center w="100%">
                    <VStack>
                      <Heading
                        lineHeight="1em"
                        fontSize="30px"
                        fontWeight="extrabold"
                        fontStyle="italic"
                        alignSelf="flex-start"
                        mb="2em"
                      >
                        No Aliens?
                      </Heading>
                      <Button
                        minW="8em"
                        size="md"
                        variant="solid"
                        colorScheme="primary"
                        justifyContent="space-between"
                        onClick={() => router.push("/")}
                        rightIcon={
                          <Image
                            alt="ufo"
                            className="ufo"
                            width="2em"
                            src={"/images/ufo.svg"}
                          />
                        }
                      >
                        Mint
                      </Button>
                    </VStack>
                  </Center>
                )}
                <SimpleGrid w="100%" columns={{ md: 3, base: 1 }} spacing="2em">
                  {getTokens()
                    .sort()
                    .map((id, index) => (
                      <Stack
                        _hover={{ cursor: "pointer" }}
                        key={index}
                        bgColor={isCarbonized(id) ? "white" : "inherit"}
                        onClick={() => setSelected(id)}
                        borderRadius={
                          isCarbonized(id) ? "40px !important" : "inherit"
                        }
                      >
                        <AspectRatio
                          key={id}
                          maxW="20em"
                          ratio={1}
                          _hover={{ cursor: "pointer" }}
                          className={
                            isCarbonized(id) ? "rainbow-box-border" : ""
                          }
                          borderRadius={
                            isCarbonized(id) ? "40px !important" : "inherit"
                          }
                        >
                          <>
                            <Image
                              draggable={false}
                              userSelect="none"
                              src={`${url}${id}.png`}
                              objectFit="cover"
                              borderRadius="2em"
                              alt={"alien"}
                            />
                          </>
                        </AspectRatio>
                        {isCarbonized(id) && (
                          <Stack
                            overflow="inherit !important"
                            justifyContent="flex-start !important"
                            alignItems="flex-end !important"
                            mt="0em !important"
                            // @ts-ignore
                            position="absolute !important"
                          ></Stack>
                        )}
                      </Stack>
                    ))}
                </SimpleGrid>
              </>
            )}
            {!address && <ConnectButton />}
          </>
        )}
      </VStack>
      <CarbonizeModal
        isOpen={isOpen}
        onClose={onClose}
        tokenId={selected}
        carbonize={!isCarbonized(selected)}
        setFetched={setFetched}
      />
    </>
  )
}
