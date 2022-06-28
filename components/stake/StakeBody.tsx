import {
  Box,
  Button,
  ButtonProps,
  Center,
  Divider,
  HStack,
  Text,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faInfoCircle, faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ethers } from "ethers"
import { constants } from "ethers/lib/ethers"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import CountUp from "react-countup"

import { config, Contracts, ZERO } from "../../config"
import {
  addBN,
  commify,
  formatBN,
  tryParseAmountToBN,
} from "../../functions/bignumber"
import { useAddress } from "../../hooks/useAccount"
import { ApprovalState, useApprove } from "../../hooks/useApprove"
import { useIsMounted } from "../../hooks/useIsMounted"
import {
  useClaimRewards,
  useStake,
  useWithdraw,
} from "../../hooks/useManageLiquidity"
import { useIsRestricted, usePoolRewardsBalance } from "../../hooks/usePool"
import { usePrevious } from "../../hooks/usePrevious"
import {
  useLockedSourceBalance,
  useSourceBalance,
} from "../../hooks/useSourceBalance"
import { useStakedBalance } from "../../hooks/useStakedBalance"
import { ConnectButton } from "../account"
import { Card, CardHeader } from "../Card"
import { CeloGlyph, SourceGradient } from "../Icon"
import { AmountsButtons } from "./AmountsButtons"
import { ConfirmModal } from "./ConfirmModal"
import { CurrencyInput } from "./input"
import { StakeTabs } from "./StakeTabs"
import { Switch, useSwitch } from "./switch"

export const StakeBody = memo((test) => {
  const isMounted = useIsMounted()
  const address = useAddress()
  const sBalance = useSourceBalance(address)
  const lsBalance = useLockedSourceBalance(address)
  const balance = addBN(sBalance, lsBalance)
  const staked = useStakedBalance(address)
  const sRewards = usePoolRewardsBalance(address, config.SOURCE_ADDRESS)
  const cRewards = usePoolRewardsBalance(address, config.CELO_ADDRESS)
  const { isRestricted } = useIsRestricted()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [input, setInput] = useState("")
  const [isAdding, { toggle }] = useSwitch()
  const [isStaking, setIsStaking] = useState(true)
  const parsedAmountBN = tryParseAmountToBN(input === "" ? "0" : input)

  const start = usePrevious(parseFloat(formatBN(isAdding ? balance : staked)))
  const end = parseFloat(formatBN(isAdding ? balance : staked))

  const rewards = useMemo(
    () => [
      {
        token: "CELO",
        amount: formatBN(cRewards),
        icon: <CeloGlyph width="32px" height="32px" />,
      },
      {
        token: "SOURCE",
        amount: formatBN(sRewards),
        icon: <SourceGradient width="32px" height="32px" />,
      },
    ],
    [sRewards, cRewards],
  )

  const { approve, approving, approvalState } = useApprove(
    Contracts.SOURCE,
    constants.MaxUint256,
    config.CREDIT_POOL_ADDRESS,
  )

  const { onStake, loading: stakingLoading } = useStake()
  const stake = useCallback(() => {
    if (!parsedAmountBN || parsedAmountBN.isZero() || !isStaking) return
    onStake(parsedAmountBN)
    setInput("")
  }, [onStake, parsedAmountBN, isStaking])

  const { onWithdraw, loading: withdrawLoading } = useWithdraw()
  const withdraw = useCallback(() => {
    if (!parsedAmountBN || parsedAmountBN.isZero() || isAdding) return
    onWithdraw(parsedAmountBN)
  }, [onWithdraw, parsedAmountBN, isAdding])

  const { onClaim, loading } = useClaimRewards()
  const claim = useCallback(() => {
    if (!sRewards || isStaking) return
    onOpen()
    setInput("")
  }, [onOpen, isStaking, sRewards])

  const handleAmountInput = useCallback((amount: string) => {
    setInput(amount)
  }, [])

  let button = <ConnectButton />
  if (address && isMounted) {
    if (isStaking) {
      if (isAdding) {
        if (approvalState !== ApprovalState.APPROVED) {
          button = (
            <ButtonPrimary
              label="Approve"
              onClick={approve}
              disabled={!input || parsedAmountBN.eq(ZERO)}
              isLoading={approvalState === ApprovalState.PENDING || approving}
              loadingText="Approving"
            />
          )
        } else {
          button = (
            <ButtonPrimary
              label="Stake"
              onClick={stake}
              isLoading={stakingLoading}
              disabled={
                isNaN(Number(input)) ||
                Number(input) <= 0 ||
                // inputUnderBalance ||
                // balanceUnderInput ||
                !isStaking
              }
            />
          )
        }
      } else {
        button = (
          <ButtonPrimary
            label="Unstake"
            onClick={withdraw}
            isLoading={withdrawLoading}
            disabled={isNaN(Number(input)) || Number(input) <= 0 || isAdding}
          />
        )
      }
    } else {
      button = <ButtonPrimary label="Claim rewards" onClick={claim} />
    }
  }

  return (
    <>
      <Card bgColor="black.dark" borderColor="transparent" maxW="md" p="4">
        <CardHeader>
          <Box>
            <HStack>
              <HStack>
                <Text fontSize="lg">Manage stake</Text>
              </HStack>
              <Box>
                <VisuallyHidden />
              </Box>
            </HStack>
          </Box>
        </CardHeader>
        <StakeTabs onToggle={() => setIsStaking((state) => !state)} />
        <Box py={4}>
          <Divider />
        </Box>

        <Box>
          {isStaking ? (
            <>
              <HStack justifyContent="space-between">
                <Box
                  as="span"
                  fontSize="md"
                  fontWeight="medium"
                  textAlign="justify"
                >
                  {isAdding ? "Stake" : "Unstake"} SOURCE
                </Box>
                <Switch onChange={toggle} on={isAdding} size="medium" />
              </HStack>

              <AmountsButtons
                onAmount={handleAmountInput}
                balance={isAdding ? balance : staked}
              />

              <Box
                mt={4}
                bgColor="#232323"
                h="auto"
                w="full"
                borderRadius="8px"
              >
                <HStack display="flex" w="100%" ml="3" pt="2">
                  <SourceGradient color="purple" h={55} w={55} mb="3" />
                  <CurrencyInput onInput={handleAmountInput} value={input} />
                </HStack>

                <Center p={1} alignItems="center" mx={2}>
                  <Divider />
                </Center>

                <HStack
                  display="flex"
                  w="full"
                  justifyContent="space-between"
                  p={4}
                >
                  <HStack>
                    <FontAwesomeIcon icon={faWallet as IconProp} />
                    <Text fontSize="md" color="#8F96AC">
                      {isAdding ? "Balance" : "Staked Balance"}
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </>
          ) : (
            <>
              <Box bgColor="#232323" p="2" borderRadius="md" mb="2">
                <HStack justifyContent="space-between">
                  <Box as="span" fontSize="md">
                    Your deposits
                  </Box>
                </HStack>
                <HStack pt="2">
                  <Box>
                    <SourceGradient />
                  </Box>
                  <Box as="span" fontSize="md">
                    <Text as="span">{commify(formatBN(staked ?? ZERO))}</Text>
                    <Text pl="2" as="span" color="gray.40">
                      SOURCE
                    </Text>
                  </Box>
                </HStack>
              </Box>
              <Box bgColor="#232323" p="2" borderRadius="md">
                <HStack justifyContent="space-between">
                  <Box as="span" fontSize="md">
                    Your rewards
                  </Box>
                </HStack>
                <HStack pt="2">
                  <Box>
                    <SourceGradient />
                  </Box>
                  <Box as="span" fontSize="md">
                    <Text as="span">{commify(formatBN(sRewards ?? ZERO))}</Text>
                    <Text pl="2" as="span" color="gray.40">
                      SOURCE
                    </Text>
                  </Box>
                </HStack>
                {!isRestricted && (
                  <HStack pt="2">
                    <Box>
                      <CeloGlyph />
                    </Box>
                    <Box as="span" fontSize="md">
                      <Text as="span">
                        {commify(formatBN(cRewards ?? ZERO))}
                      </Text>
                      <Text pl="2" as="span" color="gray.40">
                        CELO
                      </Text>
                    </Box>
                  </HStack>
                )}
              </Box>
            </>
          )}
        </Box>
        <Box mt={4}>{button}</Box>
      </Card>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onClaim={onClaim}
        claimLoading={loading}
        rewards={rewards}
      />
    </>
  )
})

interface PrimaryProps extends ButtonProps {
  label: string
}

const ButtonPrimary = ({ label, ...rest }: PrimaryProps) => (
  <Button w="full" variant="gradient" colorScheme="primary" {...rest}>
    {label}
  </Button>
)

StakeBody.displayName = "StakeBody"
