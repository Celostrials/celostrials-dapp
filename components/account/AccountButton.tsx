import { Box, Button, HStack, Text, useBreakpointValue } from "@chakra-ui/react"
import { BigNumber } from "@ethersproject/bignumber"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMemo } from "react"
import CountUp from "react-countup"

import { trimAddress } from "../../functions/address"
import { useAddress } from "../../hooks/useAccount"
import { usePrevious } from "../../hooks/usePrevious"
import { ConnectButton } from "./ConnectButton"
import { Identicon } from "./Identicon"
import colors from "../../styles/theme/foundations/colors"

export const AccountButton = ({ onOpen }: { onOpen: () => void }) => {
  const address = useAddress()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const shortAddr = useMemo(() => {
    const trimmed = trimAddress(address ?? "", 6)
    return (
      `${trimmed.slice(0, 6)}...${trimmed.slice(
        trimmed.length - 4,
        trimmed.length,
      )}` ?? ""
    )
  }, [address])

  return (
    <>
      {address ? (
        <Box
          display="flex"
          alignItems="center"
          bgColor={colors.orange}
          borderRadius="xl"
          py="0"
          ml="2em"
        >
          <Button
            bg="gray.90"
            border="1px solid transparent"
            onClick={onOpen}
            _hover={{
              border: "1px",
              borderStyle: "solid",
              borderColor: "blue.400",
              backgroundColor: "gray.700",
            }}
            borderRadius="xl"
            m="1px"
            px={3}
            height="38px"
          >
            <Text color="white" fontSize="md" fontWeight="medium" mr="2">
              {shortAddr}
            </Text>
            <Identicon account={address} />
          </Button>
        </Box>
      ) : (
        <Box ml="2em" display="flex" justifyContent="flex-end">
          <ConnectButton />
        </Box>
      )}
    </>
  )
}
