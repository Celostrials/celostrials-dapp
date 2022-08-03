import { Box, Divider, HStack, Text, VisuallyHidden } from "@chakra-ui/react"
import { memo, useState } from "react"
import { Card, CardHeader } from "../../Card"
import { StakeTabs } from "./StakeTabs"
import { CarbonizationBody } from "./CarbonizationBody"
import { RewardsBody } from "./RewardsBody"

export const StakeBody = memo(
  ({
    selected,
    setSelected,
  }: {
    selected: string[]
    setSelected: (_selected: string[]) => void
  }) => {
    const [tab, setTab] = useState(0)

    const getTabTitle = () => {
      if (tab === 0) return "Add or Remove Carbon"
      if (tab === 1) return "Climate Action Rewards"
    }

    return (
      <>
        <Card bgColor="black.dark" borderColor="transparent" maxW="md" p="4">
          <CardHeader>
            <Box>
              <HStack>
                <HStack>
                  <Text fontSize="lg">{getTabTitle()}</Text>
                </HStack>
                <Box>
                  <VisuallyHidden />
                </Box>
              </HStack>
            </Box>
          </CardHeader>
          <StakeTabs onTabChange={(num) => setTab(num)} />
          <Box py={4}>
            <Divider />
          </Box>

          <Box>
            {tab === 0 && (
              <CarbonizationBody
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {tab === 1 && <RewardsBody />}
          </Box>
        </Card>
      </>
    )
  },
)

StakeBody.displayName = "StakeBody"
