import { HStack, ButtonGroup } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { formatEther, parseEther } from "@ethersproject/units"
import { BigNumber } from "ethers"
import { useCallback } from "react"
import { ZERO } from "../../config"
import { divBN, formatBigNumber, formatBN } from "../../functions/bignumber"

const StyledBalanceMax = styled.button`
  height: 25px;
  width: 41px;
  background-color: transparent;
  border: 1px solid #957fef;
  border-radius: 0.5rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  color: #957fef;
  :hover {
    border: 1px solid #8878c3;
  }
  :focus {
    border: 1px solid #8878c3;
    outline: none;
  }
`
export const AmountsButtons = ({
  onAmount,
  balance,
}: {
  onAmount: (amount: string) => void
  balance: BigNumber
}) => {
  const handleFourthAmount = useCallback(() => {
    balance.gt(ZERO) &&
      onAmount(divBN(balance || ZERO, parseEther("4")).toString())
  }, [onAmount, balance])

  const handleHalfAmount = useCallback(() => {
    balance.gt(ZERO) &&
      onAmount(divBN(balance || ZERO, parseEther("2")).toString())
  }, [onAmount, balance])

  const handleMaxAmount = useCallback(() => {
    balance.gt(ZERO) &&
      onAmount(divBN(balance || ZERO, parseEther("1")).toString())
  }, [onAmount, balance])

  return (
    <HStack justifyContent="flex-end" my="4" py="2">
      <ButtonGroup variant="unstyled" spacing="3">
        <StyledBalanceMax onClick={handleFourthAmount}>25%</StyledBalanceMax>
        <StyledBalanceMax onClick={handleHalfAmount}>50%</StyledBalanceMax>
        <StyledBalanceMax onClick={handleMaxAmount}>max</StyledBalanceMax>
      </ButtonGroup>
    </HStack>
  )
}
