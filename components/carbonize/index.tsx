import {
  Flex,
  VStack,
  Container,
  HStack,
  Image,
  Center,
  Spinner,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { CarbonizedGraph } from "./CarbonizedGraph"
import { Collection } from "./Collection"

const Chart = dynamic<any>(
  () => import("./CarbonizedGraph").then((mod) => mod.CarbonizedGraph),
  {
    ssr: false,
  },
)

export const CarbonCards = () => {
  // const [data, setData] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch("https://carbonized-testnet.carbonized.workers.dev").then(
      async (res) => {
        // setData(await res.json())
        setLoaded(true)
      },
    )
  }, [])

  const formatData = (data) => {
    return Object.keys(data)
      .map((date) => {
        return {
          date: date,
          value: Object.keys(data[date])
            .map((tokenId) => {
              return {
                tokenId: tokenId,
                value: data[date][tokenId],
                src: `https://celostrials.s3.us-west-2.amazonaws.com/${tokenId}.png`,
              }
            })
            .reduce(
              (obj, item) =>
                Object.assign(obj, { [item.tokenId]: { ...item } }),
              {},
            ),
        }
      })
      .reduce(
        (obj, item) => Object.assign(obj, { [item.date]: item.value }),
        {},
      )
  }

  return (
    <Flex width="100%" color="white" align="center" flexDir="column">
      <VStack width="100%">
        <Container maxW="container.lg" id="mint">
          <Center mt="5em">
            <Image
              minW={"15em"}
              src={"/images/carbonize.png"}
              alt={"carbonize"}
              w="40em"
            />
          </Center>
          <HStack w="100%" justifyContent={"space-between"}>
            <Stack mt=".5em !important" alignSelf={"flex-start"}>
              <Heading
                lineHeight="1em"
                fontSize="40px"
                fontWeight="extrabold"
                alignSelf="flex-start"
              >
                Carbonize
              </Heading>
              <Text fontSize="md">
                To carbonize, first mint a{" "}
                <span style={{ fontWeight: "bold" }}>Celostrial</span> (or 2
                👽). Once minted, your new friend will appear in "Your
                Collection" bellow. To carbonize, select a Celostrial and
                provide the amount of Celo you want stake. The more Celo you
                stake, the more carbon your alien will collect!
              </Text>
              <Text fontSize="md">
                Coming soon,{" "}
                <span style={{ fontWeight: "bold" }}>Carbon Competitions</span>{" "}
                will be held periodically that reward top carbonizers with Celo
                prizes.
              </Text>
              <Text fontSize="md" color="gray.500">
                Note: Decarbonizing requires a 72 hour withdraw period, after
                which all funds can be claimed.
              </Text>
              <Text fontSize="md">Happy Carbonizing! 🌱</Text>
            </Stack>
            <Image
              src={"/images/carbonized_preview.gif"}
              borderRadius="1em"
              maxW="21em"
              alt={"alien1"}
            />
          </HStack>

          <Collection />
          <HStack w="100%" mb="3em">
            {loaded ? <Chart data={formatData(data)} /> : <Spinner />}
          </HStack>
        </Container>
      </VStack>
    </Flex>
  )
}

let data = {
  "12/01/22": {},
  "12/02/22": {
    21: 5,
  },
  "12/03/22": {
    21: 10,
    3: 2,
    8: 2,
    9: 5,
  },
  "12/04/22": {
    21: 15,
    3: 4,
    6: 9,
    8: 10,
    9: 1,
    19: 6,
  },
  "12/05/22": {
    21: 20,
    3: 6,
    6: 13,
    8: 15,
    9: 2,
    11: 21,
    19: 7,
  },
  "12/06/22": {
    21: 25,
    3: 8,
    6: 15,
    8: 20,
    9: 3,
    11: 24,
    19: 8,
  },
  "12/07/22": {
    21: 30,
    2: 10,
    3: 18,
    6: 25,
    8: 4,
    9: 27,
    11: 2,
    19: 10,
  },
  "12/08/22": {
    21: 35,
    2: 12,
    3: 19,
    6: 30,
    8: 5,
    9: 29,
    11: 3,
    19: 15,
  },
  "12/09/22": {
    21: 40,
    2: 14,
    3: 15,
    4: 35,
    6: 6,
    8: 10,
    9: 30,
    15: 10,
    17: 20,
    19: 18,
  },
  "12/10/22": {
    21: 45,
    2: 16,
    3: 16,
    4: 40,
    6: 7,
    8: 11,
    9: 35,
    15: 15,
    16: 4,
    17: 30,
    19: 20,
  },
  "12/11/22": {
    21: 50,
    2: 18,
    3: 17,
    4: 45,
    5: 8,
    8: 14,
    9: 40,
    14: 12,
    15: 20,
    16: 7,
    17: 37,
    19: 24,
  },
  "12/12/22": {
    21: 55,
    2: 18,
    3: 18,
    4: 50,
    5: 9,
    8: 16,
    9: 45,
    7: 1,
    14: 17,
    15: 24,
    16: 10,
    17: 40,
    18: 40,
    19: 25,
  },
  "12/13/22": {
    21: 60,
    2: 20,
    3: 25,
    4: 55,
    5: 10,
    8: 18,
    9: 50,
    7: 2,
    11: 2,
    14: 20,
    15: 27,
    16: 13,
    17: 45,
    18: 44,
    19: 26,
  },
  "12/14/22": {
    21: 65,
    2: 22,
    3: 0,
    4: 60,
    5: 11,
    8: 25,
    9: 51,
    7: 3,
    11: 4,
    14: 24,
    15: 30,
    16: 15,
    17: 50,
    18: 50,
    19: 28,
  },
  "12/15/22": {
    21: 70,
    2: 24,
    3: 0,
    5: 65,
    8: 26,
    9: 55,
    7: 50,
    10: 6,
    11: 8,
    12: 22,
    14: 30,
    15: 33,
    16: 16,
    17: 55,
    18: 55,
    19: 30,
  },
  "12/16/22": {
    21: 75,
    2: 26,
    3: 0,
    5: 70,
    8: 27,
    9: 57,
    7: 54,
    10: 12,
    11: 10,
    13: 11,
    14: 33,
    15: 37,
    16: 20,
    17: 60,
    18: 60,
    19: 33,
  },
  "12/17/22": {
    21: 80,
    2: 28,
    3: 0,
    5: 75,
    8: 30,
    9: 59,
    7: 56,
    10: 14,
    11: 13,
    13: 15,
    14: 35,
    15: 40,
    16: 22,
    17: 61,
    18: 65,
    19: 36,
  },
}
