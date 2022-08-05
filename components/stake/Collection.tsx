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
import { faCubes, faSackDollar } from "@fortawesome/free-solid-svg-icons"
import { useCarbonizedContract } from "../../hooks/useCarbonizedContract"
import { StakeModal } from "./modal/StakeModal"
import { useRouter } from "next/router"
import { ethToString, weiToString } from "../../functions/bignumber"
import { useCarbonRewards } from "../../hooks/useCarbonRewards"
import { useTotalCarbonized } from "../../hooks/useTotalCarbonized"
import { useCalculateAPY } from "../../hooks/useCalculateAPY"
import colors from "../../styles/theme/foundations/colors"

interface Carbonized {
  id: string
  carbon: string
}

export const Collection = () => {
  const url = "https://celostrials.s3.us-west-2.amazonaws.com/"
  const router = useRouter()
  const { walletOfOwner } = useCelostrialsContract()
  const { walletOfOwner: carbonWalletOfOwner } = useCarbonizedContract()
  const [fetched, setFetched] = useState(false)
  const [openRewards, setOpenRewards] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [carbonized, setCarbonized] = useState<Carbonized[]>([])
  const [uncarbonized, setUncarbonized] = useState<string[]>([])
  const [filter, setFilter] = useState("ALL")
  const { isOpen, onClose, onOpen } = useDisclosure()

  const [loading, setLoading] = useState(false)
  const { address, initialised } = useCelo()
  const signer = useConnectedSigner()
  const celoRewards = useCarbonRewards(address || "")
  const totalCarbonized = weiToString(useTotalCarbonized())
  // TODO: fix apy when NCT is live
  const apy = useCalculateAPY()

  const isCarbonized = (id: string): boolean => {
    return carbonized.some((carb) => carb.id === id)
  }

  const toggleSelected = (id: string) => {
    if (selected && !isSelected(id)) {
      if (isCarbonized(id)) setFilter("CARBONIZED")
      else setFilter("UNCARBONIZED")
      setSelected([...selected, id])
    } else {
      const index = selected.indexOf(id)
      if (index > -1) {
        if (selected.length == 1) setFilter("ALL")
        setSelected(
          selected.filter((item) => {
            return item !== id
          }),
        )
      }
    }
  }

  const isSelected = (id: string): boolean => {
    return !!selected && selected.includes(id)
  }

  const hasRewards = parseFloat(ethToString(celoRewards)) > 0

  const getTokens = (): string[] => {
    if (filter === "CARBONIZED") return carbonized.map((carb) => carb.id)
    if (filter === "UNCARBONIZED") return uncarbonized
    return [...carbonized.map((carb) => carb.id), ...uncarbonized]
  }

  useEffect(() => {
    if (!isOpen) setOpenRewards(false)
  }, [isOpen])

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
            return {
              id: weiToString(carb),
              carbon: ethToString(_carbonized[1][index]),
            }
          }),
        )
      }
      if (_uncarbonized)
        setUncarbonized(
          _uncarbonized.map((id) => ethers.utils.formatUnits(id, "wei")),
        )
    }
    if (initialised && walletOfOwner && carbonWalletOfOwner && !fetched)
      loadBalance()
  }, [initialised, address, walletOfOwner, carbonWalletOfOwner, fetched])

  useEffect(() => {
    if (!isOpen) {
      setSelected([])
      setFilter("ALL")
      setFetched(false)
    }
  }, [address, signer, isOpen])

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
                  YOUR COLLECTION
                </Heading>
                <Select
                  alignSelf="flex-start"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value)
                    setSelected([])
                  }}
                  backgroundColor="transparent !important"
                  w={{ md: "9em", base: "100%" }}
                >
                  <option value="ALL">All</option>
                  <option value="UNCARBONIZED">Uncarbonized Items</option>
                  <option value="CARBONIZED">Carbonized Items</option>
                </Select>
              </VStack>
              <VStack
                alignItems="flex-end"
                flexDir={{ md: "column", base: "column-reverse" }}
              >
                <HStack
                  color={colors.orange.dark}
                  width={{ md: "initial", base: "100%" }}
                  mt={{ md: "initial", base: "1em" }}
                  justifyContent={{ md: "initial", base: "center" }}
                >
                  <Text fontSize="md">Total Carbonized: {totalCarbonized}</Text>
                  <Divider
                    borderColor={colors.orange.dark}
                    opacity="1"
                    borderLeftWidth="2px"
                    h="1em"
                    orientation="vertical"
                  />
                  <Text fontSize="md" marginRight="5px">
                    APY: {apy}%
                  </Text>
                </HStack>
                {hasRewards && (
                  <Button
                    w={{ md: "initial", base: "100%" }}
                    variant="outline"
                    colorScheme="primary"
                    rightIcon={<FontAwesomeIcon icon={faSackDollar} />}
                    onClick={() => {
                      setOpenRewards(true)
                      onOpen()
                    }}
                  >
                    Rewards
                  </Button>
                )}
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
                      <Stack key={index}>
                        <AspectRatio
                          key={id}
                          maxW="20em"
                          ratio={1}
                          _hover={{ cursor: "pointer" }}
                          onClick={() => toggleSelected(id)}
                          className={isSelected(id) ? "rainbow-box-border" : ""}
                          borderRadius={
                            isSelected(id) ? "40px !important" : "inherit"
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
                          >
                            <Image
                              filter="drop-shadow(5px -3px 0 white) drop-shadow(-5px -3px 0 white) drop-shadow(0px 6px 0 white)"
                              alignSelf="center"
                              alt="NCT.png"
                              src="/images/NCT.png"
                              w="5em"
                              mt="-1em"
                              ml="-1em"
                            />
                          </Stack>
                        )}
                      </Stack>
                    ))}
                </SimpleGrid>
              </>
            )}
            {!address && <ConnectButton />}
            <Box
              display={selected?.length == 0 ? "none" : "initial"}
              position="fixed"
              bottom="0 !important"
              p="1em !important"
              w="20em"
            >
              <Stack>
                <Stack
                  _hover={{ cursor: "pointer" }}
                  onClick={onOpen}
                  className="rainbow-box"
                  height="3em"
                  alignItems="center"
                  justifyContent="center"
                >
                  <HStack
                    minW="18.1em"
                    padding="19px 67px"
                    borderRadius="20px"
                    backdropFilter="blur(18px)"
                    justifyContent="center"
                  >
                    <Text fontWeight="bold" fontSize="xl">
                      {filter == "CARBONIZED" ? "Decarbonize " : "Carbonize "}
                    </Text>
                    <FontAwesomeIcon icon={faCubes} />
                  </HStack>
                </Stack>
              </Stack>
            </Box>
          </>
        )}
      </VStack>
      <StakeModal
        selected={selected}
        setSelected={setSelected}
        isOpen={isOpen}
        onClose={onClose}
        openRewards={openRewards}
      />
    </>
  )
}
