import {
  HStack,
  Box,
  Center,
  Button,
  VStack,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  Image,
  Text,
  Checkbox,
  NumberInput,
  NumberInputField,
  usePrevious,
} from "@chakra-ui/react"
import { useSwitch } from "../switch"
import { Switch } from "../switch/Switch"
import {
  ApprovalState,
  useApproveCelostrials,
} from "../../../hooks/useApproveCelostrials"
import { useApproveCarbon } from "../../../hooks/useApproveCarbon"
import { constants } from "ethers/lib/ethers"
import { config } from "../../../config/config"
import { useApproveCarbonized } from "../../../hooks/useApproveCarbonized"
import { useCelo } from "@celo/react-celo"
import { useIsMounted } from "../../../hooks/useIsMounted"
import { useCarbonizedContract } from "../../../hooks/useCarbonizedContract"
import { useEffect, useCallback } from "react"
import { useCelostrialsContract } from "../../../hooks/useCelostrialsContract"
import { ethers } from "ethers"
import { useState } from "react"
import { Stack, Divider, Spinner } from "@chakra-ui/react"
import { CurrencyInput } from "../input/index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWallet } from "@fortawesome/free-solid-svg-icons"
import CountUp from "react-countup"
import {
  ethToString,
  formatBN,
  tryParseAmountToBN,
  weiToString,
} from "../../../functions/bignumber"
import { useCarbonBalance } from "../../../hooks/useCarbonBalance"
import { useMaxCarbon } from "../../../hooks/useMaxCarbon"
import { useMinCarbon } from "../../../hooks/useMinCarbon"
import { useCarbonize, useDecarbonize } from "../../../hooks/useManageCarbon"

interface Carbonized {
  id: string
  carbon: string
}

export const CarbonizationBody = ({
  selected,
  setSelected,
}: {
  selected: string[]
  setSelected: (_selected: string[]) => void
}) => {
  const url = "https://celostrials.s3.us-west-2.amazonaws.com/"
  const isMounted = useIsMounted()
  const [carbonized, setCarbonized] = useState<Carbonized[]>()
  const [uncarbonized, setUncarbonized] = useState<string[]>()
  const [carbon, setCarbon] = useState("")
  const [fetched, setFetched] = useState(false)
  const { address } = useCelo()
  const { exists } = useCarbonizedContract()
  const { walletOfOwner } = useCelostrialsContract()
  const { walletOfOwner: carbonWalletOfOwner } = useCarbonizedContract()
  const carbonBalance = useCarbonBalance(address || "")
  const maxCarbon = parseFloat(formatBN(useMaxCarbon()))
  const minCarbon = parseFloat(formatBN(useMinCarbon()))
  const { onCarbonize, loading: carbonizing } = useCarbonize()
  const { onDecarbonize, loading: decarbonizing } = useDecarbonize()
  const start = usePrevious(parseFloat(formatBN(carbonBalance)))
  const end = parseFloat(formatBN(carbonBalance))

  const isCarbonized = (id: string): boolean => {
    if (carbonized && carbonized.length > 0)
      return carbonized.some((carb) => carb.id === id)
    return false
  }

  const [isCarbonizing, { toggle, setOff }] = useSwitch(true)

  const {
    approve: approveCarbon,
    approving: approvingCarbon,
    approvalState: approvalStateCarbon,
  } = useApproveCarbon(constants.MaxUint256, config.CARBONIZED_ADDRESS)

  const {
    approve: approveCelostrials,
    approving: approvingCelostrials,
    approvalState: approvalStateCelostrials,
  } = useApproveCelostrials(config.CARBONIZED_ADDRESS)

  const parsedAmountBN = tryParseAmountToBN(
    carbon === "" || carbon === "." ? "0" : carbon,
  )

  const carbonize = useCallback(async () => {
    if (!parsedAmountBN || carbonizing) return
    if (parsedAmountBN.isZero()) {
      return
    }
    const tokenIds = selected.map((token) => Number(token))
    await onCarbonize(tokenIds, parsedAmountBN)
    setFetched(false)
    setSelected([])
  }, [onCarbonize, parsedAmountBN, carbonizing])

  const decarbonize = useCallback(async () => {
    if (decarbonizing) return
    if (selected.length < 1) {
      return
    }
    const tokenIds = selected.map((token) => Number(token))
    await onDecarbonize(tokenIds)
    setFetched(false)
    setSelected([])
  }, [onDecarbonize, decarbonizing])

  useEffect(() => {
    const loadBalance = async () => {
      const _uncarbonized = await walletOfOwner(address || "")
      setUncarbonized([
        ...(_uncarbonized
          ? _uncarbonized.map((id) => ethers.utils.formatUnits(id, "wei"))
          : []),
      ])

      const _carbonized = await carbonWalletOfOwner(address || "")

      setCarbonized(
        _carbonized[0].map((carb, index) => {
          return {
            id: weiToString(carb),
            carbon: ethToString(_carbonized[1][index]),
          }
        }),
      )

      setFetched(true)
    }
    if (!fetched) loadBalance()
  }, [
    setUncarbonized,
    setCarbonized,
    carbonizing,
    decarbonizing,
    decarbonize,
    carbonize,
    walletOfOwner,
    carbonWalletOfOwner,
    fetched,
  ])

  useEffect(() => {
    const loadBalance = async () => {
      if (selected.length > 0 && (await exists(Number(selected[0])))) {
        setOff()
      }
    }
    loadBalance()
  }, [exists])

  const updateSelected = (id: string) => {
    if (selected && !isSelected(id)) {
      setSelected([...selected, id])
    } else {
      const index = selected.indexOf(id)
      if (index > -1) {
        setSelected(
          selected.filter((item) => {
            return item !== id
          }),
        )
      }
    }
  }

  const getTokens = (): string[] => {
    if (!isCarbonizing) return carbonized?.map((carb) => carb.id) || []
    return uncarbonized || []
  }

  const getCarbon = (id: string): string => {
    return carbonized?.find((carb) => carb.id === id)?.carbon || "0"
  }

  const isSelected = (id: string): boolean => {
    return !!selected && selected.includes(id)
  }

  let button = (
    <Button
      w="100%"
      variant="solid"
      colorScheme="primary"
      onClick={async () => {
        isCarbonizing ? await carbonize() : await decarbonize()
      }}
      isDisabled={
        selected.length === 0 ||
        (isCarbonizing &&
          parsedAmountBN.lt(ethers.utils.parseEther(minCarbon.toString()))) ||
        parsedAmountBN.gt(ethers.utils.parseEther(maxCarbon.toString()))
      }
      isLoading={carbonizing || decarbonizing}
      loadingText="Approving"
    >
      {isCarbonizing ? "Carbonize" : "Decarbonize"}
    </Button>
  )
  if (address && isMounted) {
    if (approvalStateCarbon !== ApprovalState.APPROVED) {
      button = (
        <Button
          w="100%"
          variant="solid"
          colorScheme="primary"
          onClick={approveCarbon}
          isLoading={
            approvalStateCarbon === ApprovalState.PENDING || approvingCarbon
          }
          loadingText="Approving"
        >
          Approve Carbon
        </Button>
      )
    } else if (approvalStateCelostrials !== ApprovalState.APPROVED) {
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
  }

  if (!fetched)
    return (
      <Center p="10em">
        <Spinner />
      </Center>
    )

  return (
    <>
      <HStack justifyContent="space-between">
        <Box as="span" fontSize="md" fontWeight="medium" textAlign="justify">
          {isCarbonizing ? "Carbonize Items" : "Decarbonize Items"}
        </Box>
        <Switch
          onChange={() => {
            toggle()
            setSelected([])
            setFetched(false)
          }}
          on={isCarbonizing}
          size="medium"
        />
      </HStack>

      <Box mt={4} bgColor="#232323" h="auto" w="full" borderRadius="8px">
        {isCarbonizing && (
          <VStack pt="1em !important">
            <Text>Carbon (NCT)</Text>
            <VStack>
              <HStack pt="2">
                <Image
                  filter="drop-shadow(3px -2px 0 white) drop-shadow(-3px -2px 0 white) drop-shadow(0px 4px 0 white)"
                  alignSelf="center"
                  alt="NCT.png"
                  src="/images/NCT.png"
                  w="3em"
                  ml="1em"
                />
                <VStack>
                  <CurrencyInput onInput={(e) => setCarbon(e)} value={carbon} />
                  {/* TODO: Total */}
                </VStack>
              </HStack>
              <HStack
                color="#8F96AC"
                alignSelf="flex-start"
                ml="4.5em !important"
              >
                <Text
                  variant="caption"
                  alignSelf="flex-start"
                  ml="1em !important"
                >
                  Min: {minCarbon}
                </Text>
                <Text
                  variant="caption"
                  alignSelf="flex-start"
                  ml="1em !important"
                >
                  Max: {maxCarbon}
                </Text>
              </HStack>
            </VStack>
            <Center w="100%" p={1} alignItems="center" mx={2}>
              <Divider />
            </Center>
            <HStack
              display="flex"
              w="full"
              justifyContent="space-between"
              p={4}
            >
              <HStack>
                <FontAwesomeIcon icon={faWallet} />
                <Text fontSize="md" color="#8F96AC">
                  Balance
                </Text>
              </HStack>
              <HStack>
                <Text fontSize="sm" fontWeight="medium">
                  <CountUp
                    start={start}
                    end={end}
                    duration={0.2}
                    decimals={0}
                    delay={0}
                    separator=","
                    suffix=" NCT"
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                </Text>
              </HStack>
            </HStack>
            <Center w="100%" p={1} alignItems="center" mx={2}>
              <Divider />
            </Center>
          </VStack>
        )}
        <HStack w="100%" maxH="20em" overflow="scroll">
          <TableContainer width="100%" alignSelf="flex-start">
            <Table variant="simple" p="1em">
              <Tbody>
                {isCarbonizing
                  ? (!uncarbonized || uncarbonized.length === 0) && (
                      <Box p="1em">
                        <Text textAlign="center">No Items To Carbonize</Text>
                      </Box>
                    )
                  : (!carbonized || carbonized.length === 0) && (
                      <Box p="1em">
                        <Text textAlign="center">No Carbonized Items</Text>
                      </Box>
                    )}

                {getTokens()
                  ?.sort()
                  .map((token, index) => (
                    <Tr key={index}>
                      <Td
                        onClick={(e) => updateSelected(token)}
                        _hover={{ cursor: "pointer" }}
                      >
                        <HStack>
                          <Image
                            w="2em"
                            alt={token}
                            src={`${url}${token}.png`}
                          />
                          <Text>{token}</Text>
                          {isCarbonized(token) && (
                            <>
                              <Divider
                                h="2em"
                                mx="1em !important"
                                orientation="vertical"
                              />
                              <Stack>
                                <Image
                                  filter="drop-shadow(3px -2px 0 white) drop-shadow(-3px -2px 0 white) drop-shadow(0px 3px 0 white)"
                                  alignSelf="center"
                                  alt="NCT.png"
                                  src="/images/NCT.png"
                                  w="1em"
                                />
                              </Stack>
                              <Text>{getCarbon(token)}</Text>
                            </>
                          )}
                        </HStack>
                      </Td>
                      <Td>
                        <Stack alignItems="flex-end">
                          <Checkbox
                            isChecked={selected.includes(token)}
                            onChange={(e) => updateSelected(token)}
                          />
                        </Stack>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </HStack>
        <Center p={1} alignItems="center" mx={2}></Center>
      </Box>
      <VStack w="100%" mt="1em">
        {button}
      </VStack>
    </>
  )
}
