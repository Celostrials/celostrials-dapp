import {
  Box,
  Button,
  Center,
  forwardRef,
  TabList,
  Tabs,
  Text,
  useTab,
  useToken,
} from "@chakra-ui/react"
import colors from "../../../styles/theme/foundations/colors"

export const StakeTabs = ({
  onTabChange,
  defaultTab,
}: {
  onTabChange: (num) => void
  defaultTab: number
}) => {
  const TabButton = forwardRef((props, ref) => {
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps["aria-selected"]

    return (
      <Box
        m={1}
        w="full"
        {...tabProps}
        alignItems="center"
        bgColor={isSelected ? colors.primary.dark : "transparent"}
        borderRadius={isSelected ? "7px" : "0"}
        cursor="pointer"
      >
        <Box bgColor={"transparent"} alignItems="center" w="full">
          <Center>
            <Text as={Text} fontSize="lg" fontWeight="400">
              {props.label}
            </Text>
          </Center>
        </Box>
      </Box>
    )
  })

  return (
    <Tabs
      isLazy
      defaultIndex={defaultTab}
      onChange={onTabChange}
      variant="unstyled"
      w="full"
    >
      <TabList bgColor="#303032" borderRadius="8px">
        <TabButton label="Carbonize" />
        <TabButton label="Rewards" />
      </TabList>
    </Tabs>
  )
}
