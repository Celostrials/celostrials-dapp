import { Button, Text, useBreakpointValue } from "@chakra-ui/react"
import { useIsMounted } from "../../hooks/useIsMounted"
import { useCelo } from "@celo/react-celo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWallet } from "@fortawesome/free-solid-svg-icons"

export const ConnectButton = () => {
  const isMounted = useIsMounted()
  const btnText = useBreakpointValue({ base: "CONNECT", sm: "CONNECT WALLET" })
  const { connect, initialised } = useCelo()

  const handleConnect = async () => {
    try {
      await connect()
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      {initialised && (
        <Button
          variant="solid"
          colorScheme="primary"
          disabled={isMounted && !initialised}
          onClick={handleConnect}
          textDecoration="none !important"
          rightIcon={<FontAwesomeIcon icon={faWallet} />}
        >
          <Text
            textDecoration="none !important"
            fontSize="sm"
            letterSpacing="unset"
            fontWeight="extrabold"
          >
            {btnText}
          </Text>
        </Button>
      )}
    </>
  )
}
