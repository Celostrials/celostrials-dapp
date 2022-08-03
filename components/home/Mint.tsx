import {
  Image,
  VStack,
  Heading,
  useToast,
  useDisclosure,
  useNumberInput,
  HStack,
  Input,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import MintModal, { Token } from "./MintModal"
import { TotalMintedInfo } from "./TotalMinted"
import { Button } from "@chakra-ui/button"
import { getVMErrorMessage } from "../../functions/getVMErrorMessage"
import { getTxEvents } from "../../functions/getTxEvent"
import colors from "../../styles/theme/foundations/colors"
import { useCelo } from "@celo/react-celo"
import { ConnectButton } from "../account/ConnectButton"
import { Center } from "@chakra-ui/react"
import { stringToEth } from "../../functions/bignumber"
import { useMintCelostrials } from "../../hooks/useMintCelostrials"

const Mint = ({ myRef }: any) => {
  const { address } = useCelo()
  const [tokens, setTokens] = useState<Token[]>([])
  const [txHash, setTxHash] = useState("")
  const { onMint } = useMintCelostrials()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const mintModal = useDisclosure()
  const disabled = false

  const getTokens = (
    event: ethers.Event,
    receipt: ethers.ContractReceipt,
  ): Token => {
    return {
      id: Number(
        ethers.utils.formatUnits(event?.args?.tokenId, "wei"),
      ).toString(),
      txHash: receipt.transactionHash,
    }
  }

  const submitTx = async (amount: number) => {
    setLoading(true)
    const receipt = await onMint(amount)
    if (!receipt) {
      setLoading(false)
      return
    }
    const events = getTxEvents(receipt, "Transfer")
    const tokens = events.map((event: any) => getTokens(event, receipt))
    setLoading(false)
    setTokens(tokens)
    setTxHash(receipt.transactionHash)
    mintModal.onOpen()
  }

  const [mintAmount, setMintAmount] = useState(1)

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 10,
      precision: 0,
      onChange: (val) => {
        setMintAmount(Number(val))
      },
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps({ readOnly: true })
  const device = useBreakpointValue({ base: "mobile", md: "desktop" })
  const isMobile = device === "mobile"

  return (
    <Center mt="2em !important">
      <VStack maxW="30em" m="3em !important" mb="0 !important">
        <Heading alignSelf="center" fontStyle="italic" fontSize="50px">
          MINT NOW!
        </Heading>
        <HStack w="100%" justifyContent={"space-between"}>
          <Image
            w="70%"
            alt="alien 1"
            maxW="18em"
            src={"images/no_background.png"}
            mr="-19em"
            mb="-.5em !important"
            zIndex="1"
            mt="0 !important"
          />
          <Image
            w="70%"
            alt="alien 2"
            maxW="18em"
            src={"images/no_background_2.png"}
            mr="-19em"
            mb="-.5em !important"
            zIndex="auto"
            mt="0 !important"
          />
        </HStack>
        <VStack
          borderRadius="1em"
          padding="2em"
          backgroundColor="#ffffff1f"
          justifyContent={"center"}
        >
          <HStack
            border="3px solid"
            borderRadius={"1em"}
            padding="1em"
            backgroundColor={"#525252"}
            borderColor={colors.gray.cement}
            marginBottom={"2em"}
            marginX={{ md: "5em !important", base: "initial" }}
          >
            <Button background={colors.gray.cement} {...dec}>
              -
            </Button>
            <Input
              w="5em"
              textAlign="center"
              border="none !important"
              backgroundColor="transparent !important"
              color="white"
              fontSize={"2xl"}
              fontWeight="bold"
              {...input}
            />
            <Button background={colors.gray.cement} {...inc}>
              +
            </Button>
          </HStack>
          {address ? (
            <Button
              minW="8em"
              size="md"
              onClick={async () => await submitTx(mintAmount)}
              variant="solid"
              colorScheme="primary"
              justifyContent="space-between"
              rightIcon={
                <Image
                  alt="ufo"
                  className="ufo"
                  width="2em"
                  src={"images/ufo.svg"}
                />
              }
              isLoading={loading}
              disabled={disabled}
            >
              Mint
            </Button>
          ) : (
            <ConnectButton />
          )}
        </VStack>

        <MintModal
          isOpen={mintModal.isOpen}
          onClose={mintModal.onClose}
          tokens={tokens}
          txHash={txHash}
        />
        <TotalMintedInfo />
        <Spacer id="about" />
      </VStack>
    </Center>
  )
}

export default Mint
