// import { useCelo } from "@celo/react-celo"
// import {
//   Box,
//   Button,
//   ButtonProps,
//   chakra,
//   Divider,
//   Flex,
//   HStack,
//   Progress,
//   Text,
//   useDisclosure,
//   VStack,
// } from "@chakra-ui/react"
// import { useRouter } from "next/router"
// import { useCallback } from "react"
// import { commify, formatBN } from "../functions/bignumber"
// import { useAddress } from "../hooks/useAccount"
// import { useGetTotalCredit } from "../hooks/useManageLiquidity"
// import {
//   useIsRestricted,
//   usePool,
//   usePoolStakeBalance,
//   useTVL,
// } from "../hooks/usePool"
// import { Card } from "./Card"
// import { CeloGlyph, RDollarGlyph, SourceGradient } from "./Icon"
// import { StakeModal } from "./stake"

// export const PoolStatsCard = () => {
//   const poolCredit = useGetTotalCredit()
//   const [reward1, reward2] = usePool()
//   const tvl = useTVL()
//   const { isRestricted, isLoading } = useIsRestricted()

//   return (
//     <Card
//       mt="4"
//       mb="4"
//       w="full"
//       borderWidth="1px"
//       borderRadius="lg"
//       borderColor="purple.main"
//     >
//       <HStack p="4" display="flex" w="100%" justifyContent="space-between">
//         <Box>
//           <Box
//             color="black"
//             letterSpacing="wide"
//             fontSize="lg"
//             fontWeight="semibold"
//           >
//             ReSource Network Pool
//           </Box>
//           <Box fontSize="sm" opacity="0.66" color="gray">
//             RSN (all businesses)
//           </Box>
//         </Box>
//         {!isRestricted && !isLoading && <StakeButton />}
//       </HStack>

//       <Divider mx={4} size="1px" color="black" w="auto" />

//       <VStack>
//         <HStack
//           pt="2"
//           px="4"
//           display="flex"
//           w="100%"
//           justifyContent="space-between"
//         >
//           <Box>
//             <Box
//               color="black"
//               letterSpacing="normal"
//               fontSize="md"
//               fontWeight="light"
//             >
//               Credit underwritten
//             </Box>
//           </Box>
//           <Flex direction="row" alignItems="center">
//             <Box
//               pr="4"
//               fontSize="md"
//               color="black"
//               fontWeight="light"
//               letterSpacing="normal"
//             >
//               <Text variant="number">{commify(poolCredit)}</Text>
//             </Box>
//             <RDollarGlyph w="20px" h="20px" />
//           </Flex>
//         </HStack>

//         <HStack
//           pt="0"
//           px="4"
//           display="flex"
//           w="100%"
//           justifyContent="space-between"
//         >
//           <Box>
//             <Box
//               color="black"
//               letterSpacing="normal"
//               fontSize="md"
//               fontWeight="light"
//             >
//               Rewards / week
//             </Box>
//           </Box>

//           <Flex direction="row" alignItems="center">
//             {!isRestricted && (
//               <>
//                 <Box
//                   pr="2"
//                   fontSize="md"
//                   color="black"
//                   fontWeight="light"
//                   letterSpacing="normal"
//                 >
//                   <Text variant="number" pr=".5em">
//                     {commify(
//                       Math.floor(
//                         (reward2 && reward2.distribution) ?? 0.0,
//                       ).toString(),
//                     )}
//                   </Text>
//                 </Box>
//                 <CeloGlyph w="20px" h="20px" />
//               </>
//             )}

//             <Box
//               px="2"
//               fontSize="md"
//               color="black"
//               fontWeight="light"
//               letterSpacing="normal"
//             >
//               <Text variant="number" pr=".5em">
//                 {commify(
//                   Math.floor(
//                     (reward1 && reward1.distribution) ?? 0.0,
//                   ).toString(),
//                 )}
//               </Text>
//             </Box>
//             <SourceGradient w="20px" h="20px" />
//           </Flex>
//         </HStack>

//         <HStack
//           pt="0"
//           px="4"
//           pb="2"
//           display="flex"
//           w="100%"
//           justifyContent="space-between"
//         >
//           <Box>
//             <Box
//               color="black"
//               letterSpacing="normal"
//               fontSize="md"
//               fontWeight="light"
//             >
//               TVL
//             </Box>
//           </Box>
//           <Flex direction="row" alignItems="center">
//             <Box
//               pr="4"
//               fontSize="md"
//               color="black"
//               fontWeight="light"
//               letterSpacing="normal"
//             >
//               <Text variant="number">{commify(formatBN(tvl))}</Text>
//             </Box>
//             <SourceGradient w="20px" h="20px" />
//           </Flex>
//         </HStack>
//       </VStack>

//       <Divider mx={4} size="1px" color="black" w="auto" />

//       <HStack p="4" display="flex" w="100%" justifyContent="space-between">
//         <Box>
//           <Box
//             color="black"
//             letterSpacing="wide"
//             fontSize="lg"
//             fontWeight="semibold"
//           >
//             APY
//           </Box>
//         </Box>
//         <Box>
//           <Flex direction="row" alignItems="center">
//             {!isRestricted && (
//               <>
//                 <Box
//                   pr="2"
//                   fontSize="md"
//                   color="black"
//                   fontWeight="light"
//                   letterSpacing="normal"
//                 >
//                   <HStack>
//                     <Text variant="number">
//                       {(reward2 &&
//                         reward2.avgApr?.toFixed(0, {
//                           groupSeparator: ",",
//                         })) ??
//                         commify("0")}
//                     </Text>

//                     <Text as="span" color="gray.40" variant="number">
//                       %
//                     </Text>
//                   </HStack>
//                 </Box>

//                 <Text as="span" px="2" color="gray.40">
//                   +
//                 </Text>
//               </>
//             )}
//             <Box
//               px="2"
//               fontSize="md"
//               color="black"
//               fontWeight="light"
//               letterSpacing="normal"
//             >
//               <HStack>
//                 <Text variant="number">
//                   {(reward1 &&
//                     reward1.avgApr?.toFixed(0, {
//                       groupSeparator: ",",
//                     })) ??
//                     commify("0")}
//                 </Text>
//                 <Text as="span" color="gray.40" variant="number">
//                   %
//                 </Text>
//               </HStack>
//             </Box>
//           </Flex>
//         </Box>
//       </HStack>
//     </Card>
//   )
// }

// export const StakeButton = (props: ButtonProps) => {
//   const { isOpen, onClose, onOpen } = useDisclosure()
//   const { account, connect } = useCelo()
//   const { isRestricted } = useIsRestricted()
//   const address = useAddress()
//   const staked = usePoolStakeBalance(address)
//   const hasStaked = staked.gt(0)
//   const router = useRouter()

//   const handleStake = useCallback(() => {
//     const handler = async () => {
//       if (!router.pathname.includes("/stake")) {
//         return router.push("/stake")
//       }
//       if (!account) {
//         try {
//           await connect()
//         } catch (e) {
//           console.log(e)
//         }
//       } else if (!isRestricted) {
//         onOpen()
//       }
//     }
//     handler()
//   }, [account, connect, isRestricted, onOpen, router])

//   return (
//     <>
//       <Box>
//         {props.children ? (
//           <Button
//             variant="gradient"
//             colorScheme="primary"
//             onClick={handleStake}
//           >
//             {props.children}
//           </Button>
//         ) : (
//           <Button
//             variant="gradient"
//             colorScheme="primary"
//             onClick={handleStake}
//             color="white"
//           >
//             {hasStaked ? "Manage" : "Stake"}
//           </Button>
//         )}
//       </Box>
//       <StakeModal isOpen={isOpen} onClose={onClose} />
//     </>
//   )
// }
