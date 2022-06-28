import { Center, Button } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  VStack,
  Image,
  Text,
  Link,
  HStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react"
import { faBolt, faCompass, faCubes } from "@fortawesome/free-solid-svg-icons"
import colors from "../../styles/theme/foundations/colors"

export const FAQ = () => {
  return (
    <VStack alignItems="flex-start" mt="3em">
      <Heading
        fontSize="40px"
        fontWeight="extrabold"
        fontStyle="italic"
        id="faq"
      >
        FAQ
      </Heading>
      <Accordion allowToggle w="100%">
        <AccordionItem>
          <AccordionButton justifyContent="space-between">
            <Text fontSize="md" color="white" textAlign={"left"}>
              What are Celostrials?
            </Text>
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="white" textAlign={"left"}>
              Celostrials are an intergalactic collection of unique beings,
              found exclusively on the Celo Blockchain. They are algorithmically
              generated at random. Very soon you can mint your very own
              interstellar explorer and join our galactic empire at
              Celostrials.com.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton justifyContent="space-between">
            <Text fontSize="md" color="white" textAlign={"left"}>
              How can I mint a Celostrial?
            </Text>
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="white" textAlign={"left"}>
              Celostrials can be minted through our website at launch. There
              will only be 10,000 Celostrials in the solar system for minting so
              make sure to make first contact. If you are late you will have to
              purchase the Celostrial from the secondary marketplace.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton justifyContent="space-between">
            <Text fontSize="md" color="white" textAlign={"left"}>
              What is the minting price?
            </Text>
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="white" textAlign={"left"}>
              You can acquire a Celostrial for only 3 Celo if you mint them at
              launch. The price will vary in the secondary market.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton justifyContent="space-between">
            <Text fontSize="md" color="white" textAlign={"left"}>
              Which wallet is supported for minting Celostrials?
            </Text>
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="white" textAlign={"left"}>
              Most wallets can be used to mint your Celostrials at launch,
              including Valora, WalletConnect, Ledger, Celo Wallet, Metamask,
              and more.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton justifyContent="space-between">
            <Text fontSize="md" color="white" textAlign={"left"}>
              How many celostrials are reserved?
            </Text>
            <AccordionIcon color="white" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="white" textAlign={"left"}>
              At mint there were 200 Celostrials reserved for community
              building, events, and giveaways (All of which have been given
              away!)
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  )
}
