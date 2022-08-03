import { memo } from "react"
import { HStack, VStack, Box, Text, Image } from "@chakra-ui/react"
import { CeloGlyph } from "../../Icon"
import { commify } from "ethers/lib/utils"
import { useCeloToUSD } from "../../../hooks/usePrice"
import { ethToString, formatBN } from "../../../functions/bignumber"
import { ZERO } from "../../../config"
import { useCarbonizedBalance } from "../../../hooks/useCarbonizedBalance"
import { useCarbonRewards } from "../../../hooks/useCarbonRewards"
import { useCelo } from "@celo/react-celo"
import { Button } from "@chakra-ui/button"
import { useClaimCarbonRewards } from "../../../hooks/useClaimCarbonRewards"

export const RewardsBody = memo(() => {
  const { account } = useCelo()
  const carbonBalance = useCarbonizedBalance(account || "")
  const celoRewards = useCarbonRewards(account || "")
  const celoRewardsUSD = useCeloToUSD(ethToString(celoRewards))
  const { onClaimRewards, loading } = useClaimCarbonRewards()

  const hasRewards = () => {
    return celoRewards.gt(ZERO)
  }

  return (
    <>
      <VStack display="flex" w="100%" pt="2">
        <Box
          bgColor="#232323"
          p="1em"
          w="100%"
          borderRadius="md"
          mb="2 !important"
        >
          <HStack justifyContent="space-between">
            <Box as="span" fontSize="md">
              Your carbon deposits
            </Box>
          </HStack>
          <HStack pt="2">
            <Box>
              <Image
                filter="drop-shadow(3px -2px 0 white) drop-shadow(-3px -2px 0 white) drop-shadow(0px 3px 0 white)"
                alignSelf="center"
                alt="NCT.png"
                src="/images/NCT.png"
                w="2em"
              />
            </Box>
            <Box as="span" fontSize="md">
              <Text as="span">
                {parseFloat(formatBN(carbonBalance ?? ZERO)).toFixed(2)}
              </Text>
              <Text pl="2" as="span" color="gray.40">
                NCT
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box w="100%" p="1em" bgColor="#232323" borderRadius="md">
          <HStack justifyContent="space-between">
            <Box as="span" fontSize="md">
              Your rewards
            </Box>
            <Box as="span" fontSize="md">
              ${parseFloat(celoRewardsUSD).toFixed(2)}
            </Box>
          </HStack>
          <HStack pt="2">
            <Box>
              <CeloGlyph />
            </Box>
            <Box as="span" fontSize="md">
              <Text as="span">
                {parseFloat(ethToString(celoRewards)).toFixed(2) ?? ZERO}
              </Text>
              <Text pl="2" as="span" color="gray.40">
                CELO
              </Text>
            </Box>
          </HStack>
        </Box>
        <Button
          w="100%"
          variant="solid"
          colorScheme="primary"
          mt="1em !important"
          onClick={async () => {
            await onClaimRewards()
          }}
          isDisabled={!hasRewards()}
          isLoading={loading}
          loadingText="Claiming"
        >
          Claim
        </Button>
      </VStack>
    </>
  )
})

RewardsBody.displayName = "RewardsBody"
