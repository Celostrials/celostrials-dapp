import { Center, Button, useBreakpointValue } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  VStack,
  Image,
  Text,
  Spacer,
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
          CELOSTRIALS <span style={{ color: colors.orange.dark }}>ROADMAP</span>
        </Heading>
        <Text mb="-2em !important" color="gray.400">
          Feb 2022
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
          Jan 2023
        </Text>
        <RoadmapItem
          titleAccent={"CARBON"}
          title={"IZED CELOSTRIALS"}
          body={
            "Partnership with Toucan, Spirals and Celo to bring carbonization to the Celostrials universe"
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
          CELOSTRIALS <span style={{ color: colors.orange.dark }}>ROADMAP</span>
        </Heading>
        <HStack w="100%" justifyContent={"space-between"}>
          <VStack alignItems={"flex-start"}>
            <Text mb="-2em !important" color="gray.400">
              Feb 2022
            </Text>
            <Image
              alignSelf="flex-start"
              w="10em"
              mt="3em !important"
              mb="-5em !important"
              src="images/Q1.png"
              alt="Q1"
            />
            <RoadmapItem
              titleAccent={"LIVE"}
              title={" MINT INVASION"}
              body={
                "5% of mint funds go to eradicating poverty around the world via the Impact Market's decentralized poverty alleviation protocol"
              }
            />
          </VStack>
          <VStack alignItems={"flex-start"}>
            <Text color="gray.400">Jan 2023</Text>
            <Image
              mb="-5em !important"
              alignSelf="flex-start"
              w="10em"
              src="images/Q2.png"
              alt="Q2"
            />
            <RoadmapItem
              titleAccent={"CARBON"}
              title={"IZED CELOSTRIALS"}
              body={
                "Partnership with Toucan, Spirals and Celo to bring carbonization to the Celostrials universe"
              }
            />
          </VStack>
        </HStack>
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
          <span
            style={{
              marginLeft: "10px",
              fontSize: "50px",
              fontStyle: "initial",
              lineHeight: "60px",
            }}
          >
            _<br />
          </span>
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
