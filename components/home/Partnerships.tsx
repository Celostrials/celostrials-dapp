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
} from "@chakra-ui/react"
import { faBolt, faCompass, faCubes } from "@fortawesome/free-solid-svg-icons"
import colors from "../../styles/theme/foundations/colors"

export const Partnerships = () => {
  return (
    <VStack alignItems="flex-start" mt="3em">
      <Heading
        alignSelf="center"
        fontSize="40px"
        fontWeight="extrabold"
        fontStyle="italic"
      >
        PARTNERS
      </Heading>
      <VStack alignSelf="center" spacing="3em">
        <HStack spacing="2em">
          <Link target="_blank" href="https://toucan.earth/">
            <Image src="images/toucan.png" alt="toucan logo" w="10em" />
          </Link>
          <Link target="_blank" href="https://celo.org/">
            <Image src="images/celo.png" alt="celo logo" w="10em" />
          </Link>
          <Link target="_blank" href="https://www.spirals.so/">
            <Image src="images/spirals.png" alt="sprials logo" w="10em" />
          </Link>
          <Link target="_blank" href="https://www.impactmarket.com/">
            <Image src="images/impact-market.png" alt="impact logo" w="10em" />
          </Link>
        </HStack>
        <HStack spacing="4em">
          <Link target="_blank" href="https://goodghosting.com/#/">
            <Image src="images/good-ghosting.png" alt="good logo" w="10em" />
          </Link>
          <Link target="_blank" href="https://ariswap.net/">
            <Image src="images/ari.png" alt="ari logo" w="5em" />
          </Link>
          <Link target="_blank" href="https://cyberbox.art/">
            <Image src="images/cyberbox.png" alt="cyberbox logo" w="10em" />
          </Link>
          <Link target="_blank" href="https://nom.space/#/">
            <Image src="images/nom.png" alt="nom logo" w="5em" />
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}
