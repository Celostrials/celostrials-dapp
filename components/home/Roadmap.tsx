import { Center, Button, useBreakpointValue } from "@chakra-ui/react"
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

export const Roadmap = () => {
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (isMobile) {
    return (
      <VStack alignItems="flex-start" mt="3em">
        <Heading
          alignSelf="center"
          fontSize="40px"
          fontWeight="extrabold"
          fontStyle="italic"
        >
          CELOSTRIALS ROADMAP{" "}
          <span style={{ color: colors.orange.dark }}>2022</span>
        </Heading>
        <Text mb="-2em !important" color="gray.400">
          Q1
        </Text>
        <RoadmapItem
          titleAccent={"LIVE"}
          title={" MINT INVASION"}
          body={
            "5% of mint funds go to eradicating poverty around the world via the Impact Market's decentralized poverty alleviation protocol"
          }
        />
        <Image
          alignSelf="center"
          w="75% !important"
          mt="3em !important"
          mb={"-2em !important"}
          src="images/Q1.png"
          alt="Q1"
        />
        <Text mb="-2em !important" color="gray.400">
          Q2
        </Text>
        <RoadmapItem
          titleAccent={"CARBON"}
          title={"IZED CELOSTRIALS"}
          body={
            "Partnership with Toucan and Celo to bring carbonization and staking to the Celostrials universe"
          }
        />
        <Image
          alignSelf="center"
          w="75% !important"
          mt="3em !important"
          mb={"-2em !important"}
          src="images/Q2.png"
          alt="Q2"
        />
        <Text mb="-2em !important" color="gray.400">
          Q3
        </Text>
        <RoadmapItem
          titleAccent={"LIMITED"}
          title={" EDITION MERCH"}
          body={
            "Member Exclusive Celostrial Merch store gets unlocked, featuring Limited editon tees"
          }
        />
        <Image
          alignSelf="center"
          w="75% !important"
          mt="3em !important"
          mb={"-2em !important"}
          src="images/Q3.png"
          alt="Q3"
        />
        <Text mb="-2em !important" color="gray.400">
          Q4
        </Text>
        <RoadmapItem
          titleAccent={"SOL"}
          title={"ESTRIALS"}
          titleAccent2={"ETH"}
          title2={"ESTRIALS"}
          body={
            "Limited special collections on Solana and Ethereum, discounts and early access for Celostrial holders."
          }
        />
        <Image
          alignSelf="center"
          w="75% !important"
          mt="3em !important"
          mb={"-2em !important"}
          src="images/Q4.png"
          alt="Q4"
        />
      </VStack>
    )
  } else {
    return (
      <VStack alignItems="flex-start" mt="3em">
        <Heading
          alignSelf="center"
          fontSize="40px"
          fontWeight="extrabold"
          fontStyle="italic"
          mb="2em"
        >
          CELOSTRIALS ROADMAP{" "}
          <span style={{ color: colors.orange.dark }}>2022</span>
        </Heading>
        <VStack>
          <HStack ml="12em" alignSelf="flex-start">
            <RoadmapItem
              titleAccent={"CARBON"}
              title={"IZED CELOSTRIALS"}
              body={
                "Partnership with Toucan and Celo to bring carbonization and staking to the Celostrials universe"
              }
            />

            <RoadmapItem
              titleAccent={"SOL"}
              title={"ESTRIALS"}
              titleAccent2={"ETH"}
              title2={"ESTRIALS"}
              body={
                "Limited special collections on Solana and Ethereum, discounts and early access for Celostrial holders."
              }
              ml="8em !important"
            />
          </HStack>
          <Image alt="roadmap" src="images/roadmap.png" mt="-2em !important" />

          <HStack mt="-6em !important" alignSelf="flex-start">
            <RoadmapItem
              titleAccent={"LIVE"}
              title={" MINT INVASION"}
              body={
                "5% of mint funds go to eradicating poverty around the world via the Impact Market's decentralized poverty alleviation protocol"
              }
            />
            <RoadmapItem
              titleAccent={"LIMITED"}
              title={" EDITION MERCH"}
              body={
                "Member Exclusive Celostrial Merch store gets unlocked, featuring Limited editon tees"
              }
              ml="8em !important"
            />
          </HStack>
        </VStack>
      </VStack>
    )
  }
}

interface RoadmapItemProps {
  title: string
  titleAccent: string
  title2?: string
  titleAccent2?: string
  body: string
  ml?: string
}

const RoadmapItem = ({
  title,
  titleAccent,
  title2,
  titleAccent2,
  body,
  ml,
}: RoadmapItemProps) => {
  return (
    <VStack maxW="22em" ml={ml}>
      <Heading
        alignSelf="flex-start"
        fontSize="40px"
        fontWeight="extrabold"
        fontStyle="italic"
        mb="0 !important"
        lineHeight="1em"
      >
        <span style={{ color: colors.orange.dark }}>
          {" "}
          _<br />
          {titleAccent}
        </span>
        {title}
        {titleAccent2 && title2 && (
          <>
            <span style={{ color: colors.orange.dark }}>
              <br />
              {titleAccent2}
            </span>
            {title2}
          </>
        )}
      </Heading>
      <Text fontSize="md">{body}</Text>
    </VStack>
  )
}
