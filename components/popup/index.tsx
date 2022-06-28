import { useCelo } from "@celo/react-celo"
import {
  Box,
  Container,
  Flex,
  HStack,
  Link,
  Text,
  useToken,
} from "@chakra-ui/react"
import {
  CheckCircle,
  ExternalLink,
  InformationCircle,
} from "@emotion-icons/heroicons-solid"
import { get, keys } from "lodash"

import { BlockExplorers, ChainId } from "../../config/constants"
import { useActiveToasts } from "../../state"
import { ProgressCountdown } from "../Progress"
import { Toast } from "./Toast"

export type PopupContent = {
  txn: {
    hash: string
    success: boolean
    summary?: string
  }
}

export function Popups() {
  const chainId = ChainId.LOCALHOST
  const toasts = useActiveToasts()
  const ids = keys(toasts)
  const { network } = useCelo()
  const [blue] = useToken("colors", ["blue.50"])
  const duration = 10000

  const Content = ({ id }: { id: string }) => {
    const { success, summary, hash } = get(toasts[id], "content[txn]")
    return (
      <HStack w="full" pb="2">
        {success ? (
          <CheckCircle color="green" size={24} />
        ) : (
          <InformationCircle color="red" size={24} />
        )}

        <Flex alignItems="flex-start" flexDir="column" pl="4">
          <Text
            fontWeight={500}
            color="white"
            fontSize="lg"
            letterSpacing="tight"
          >
            {summary ??
              "Hash: " + hash.slice(0, 8) + "..." + hash.slice(58, 65)}
          </Text>
          {chainId && hash && (
            <Link
              target="_blank"
              pr="4"
              as={Link}
              fontSize="md"
              color={blue}
              href={`${network.explorer}/tx/${hash}`}
              rel="noreferrer"
            >
              <Flex flexDir="row" justifyContent="space-between">
                view on explorer
                <ExternalLink size={24} color={blue} />
              </Flex>
            </Link>
          )}
        </Flex>
      </HStack>
    )
  }

  return (
    <>
      {ids.map((id, idx) => (
        <Toast duration={duration} key={idx} toastId={id}>
          <Container>
            <Box
              width="inherit"
              bgColor="gray.90"
              borderRadius="10px"
              px="4"
              pb="0"
              pt="4"
            >
              <Content id={id} />
              <ProgressCountdown
                duration={duration}
                h="3px"
                bgColor="inherit"
              />
            </Box>
          </Container>
        </Toast>
      ))}
    </>
  )
}
