import {
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  SpinnerIcon,
} from "@chakra-ui/icons"
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBreakpointValue,
  useClipboard,
  usePrevious,
  VStack,
} from "@chakra-ui/react"
import { useCallback, useMemo } from "react"

import { nanoid } from "../../functions"
import { trimAddress } from "../../functions/address"
import { formatBN } from "../../functions/bignumber"
import { useAddress } from "../../hooks/useAccount"
import {
  useLockedSourceBalance,
  useSourceBalance,
} from "../../hooks/useSourceBalance"
import {
  useClearTransactions,
  useGetTransactions,
} from "../../state/transactions"
import { MetaMaskIcon } from "../Icon"
import { Identicon } from "./Identicon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import CountUp from "react-countup"
import { useCelo } from "@celo/react-celo"

export const AccountModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { network, destroy } = useCelo()
  const chainId = network.chainId
  const address = useAddress()
  const shortAddr = useMemo(() => {
    const trimmed = trimAddress(address ?? "", 6)
    return (
      `${trimmed.slice(0, 6)}...${trimmed.slice(
        trimmed.length - 4,
        trimmed.length,
      )}` ?? ""
    )
  }, [address])

  const { hasCopied, onCopy } = useClipboard(address || "")

  const state = useGetTransactions()
  const clear = useClearTransactions()

  const transactions = useMemo(
    () =>
      chainId && state
        ? Object.keys(state[chainId] ?? {}).map((h) => ({
            id: nanoid(),
            summary: state[chainId][h].summary,
            success: state[chainId][h].receipt ? true : false,
          })) ?? []
        : [],
    [chainId, state],
  )

  const disconnect = useCallback(() => {
    destroy()
    onClose()
  }, [destroy, onClose])

  return (
    <Modal
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInRight"
    >
      <ModalOverlay bg="black.blur" backdropFilter="blur(10px)" />
      <ModalContent
        border="1px solid gray.800"
        borderStyle="solid"
        borderRadius="8px"
        bg="black.dark"
        m="1em"
        alignSelf="center"
      >
        <ModalHeader color="white" fontSize="xl" fontWeight="500">
          <HStack display="flex" alignItems="center">
            <Box>Account</Box>
            <Box>
              <ModalCloseButton mt={2} />
            </Box>
          </HStack>
        </ModalHeader>

        <ModalBody pt={0} px={4}>
          <Divider />
          <Box borderRadius="3xl" px={2} pt={4} pb={2} mb={3}>
            <HStack
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Flex alignItems="center" mt={0} mb={4} lineHeight={1}>
                <Box pr="4">
                  {address && (
                    <Identicon
                      account={address}
                      h="3rem"
                      w="3rem"
                      diameter={64}
                    />
                  )}
                </Box>
                <Text
                  pl="4"
                  pt="4"
                  color="white"
                  fontSize="xl"
                  fontWeight="300"
                  lineHeight="1.1"
                >
                  {shortAddr}
                </Text>
              </Flex>

              <AccountButton onClick={disconnect} label="Disconnect" />
            </HStack>

            <HStack display="flex" justifyContent="space-between" w="full">
              <Flex m={0}>
                <Link
                  fontSize="sm"
                  display="flex"
                  alignItems="center"
                  href={`${network.explorer}address/${address}`}
                  isExternal
                  color="blue.main"
                  _hover={{
                    color: "whiteAlpha.800",
                    textDecoration: "underline",
                  }}
                >
                  View on Explorer
                  <ExternalLinkIcon ml="2" />
                </Link>

                <Button
                  variant="link"
                  color="gray.400"
                  fontWeight="normal"
                  fontSize="sm"
                  ml="4"
                  _hover={{
                    textDecoration: "none",
                    color: "whiteAlpha.800",
                  }}
                  onClick={onCopy}
                >
                  {hasCopied ? "Copied" : "Copy Address"}
                  <CopyIcon ml="2" />
                </Button>
              </Flex>
              <Flex>
                <MetaMaskIcon style={{ height: "42px", width: "42px" }} />
              </Flex>
            </HStack>
          </Box>
          <Divider />
        </ModalBody>

        <ModalFooter borderBottomLeftRadius="3xl" borderBottomRightRadius="3xl">
          <VStack w="full">
            <HStack
              w="full"
              display="flex"
              justifyContent="space-between"
              pb="4"
            >
              <Text color="white" opacity="0.6" fontSize="md">
                Recent Transactions
              </Text>

              {transactions && transactions.length && (
                <AccountButton onClick={clear} label="Clear all" />
              )}
            </HStack>

            <VStack
              pt="4"
              overflowY="auto"
              h="15rem"
              pb="4"
              width="full"
              spacing="5"
              display="flex"
              justifyContent="flex-start"
            >
              {transactions.map((t) => (
                <HStack key={t.id} spacing={4} w="full">
                  {t.success ? (
                    <CheckIcon color="#9FFC7F" />
                  ) : (
                    <SpinnerIcon w="12px" />
                  )}
                  <Text
                    color="white"
                    letterSpacing="wide"
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    {t.summary}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const AccountInfo = ({ address }: { address: string }) => {
  const sBalance = formatBN(useSourceBalance(address))
  const lsBalance = formatBN(useLockedSourceBalance(address))
  const startBal = usePrevious(parseFloat(sBalance))
  const endBal = parseFloat(sBalance)
  const startLocked = usePrevious(parseFloat(lsBalance))
  const endLocked = parseFloat(lsBalance)

  return (
    <HStack my="1.5em">
      <HStack
        h="10"
        display="flex"
        alignItems="center"
        background="#FEF7EC"
        borderRadius="xl"
        px="1em"
      >
        <FontAwesomeIcon icon={faLock as IconProp} color="black" />
        <Text ml="1em" w="max-content" color="black" fontSize="md">
          <CountUp
            start={startLocked}
            end={endLocked}
            duration={0.5}
            decimals={0}
            delay={0}
            separator=","
            suffix=" SOURCE"
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        </Text>
      </HStack>
      <HStack
        h="10"
        display="flex"
        alignItems="center"
        background="#957FEF"
        borderRadius="xl"
        py="0"
      >
        <Text w="max-content" px="1em" color="white" fontSize="md">
          <CountUp
            start={startBal}
            end={endBal}
            duration={0.5}
            decimals={0}
            delay={0}
            separator=","
            suffix=" SOURCE"
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        </Text>
      </HStack>
    </HStack>
  )
}

const AccountButton = ({
  label,
  onClick,
}: {
  label: string
  onClick: () => void
}) => (
  <Button
    variant="outline"
    size="md"
    borderColor="blue.main"
    borderWidth="1px"
    borderRadius="8px"
    color="primary.main"
    fontSize="13px"
    fontWeight="normal"
    px={2}
    height="26px"
    _hover={{
      background: "none",
      borderColor: "primary.main",
      textDecoration: "underline",
    }}
    onClick={onClick}
  >
    {label}
  </Button>
)
