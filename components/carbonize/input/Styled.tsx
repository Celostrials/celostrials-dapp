import _styled from "@emotion/styled"
import { Box } from "@chakra-ui/react"
import { NumericalInput } from "./NumericalInput"
import { styled } from "../../../styles/theme"

export const InputPanel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  box-shadow: none !important;
  z-index: 1;
  width: initial;
  transition: height 1s ease;
  will-change: height;
`

export const Container = styled.div`
  background-color: #181818 !important;
  width: 100%;
`

export const Row = _styled(Box)<{
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align ?? "center"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
`

export const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.8rem;
`

export const LabelRow = styled.div`
  display: flex;
  width: full;
  flex-flow: row nowrap;
  align-items: center;
  color: #ffffff;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0 1rem 1rem;
`

export const FiatRow = _styled(LabelRow)`
  width: 100% !important;
  justify-content: space-between;

`

export const StyledBalanceMax = styled.button<{ disabled?: boolean }>`
  background-color: transparent;
  background-color: #153d6f70;
  border: none;
  border-radius: 12px;
  color: #232323;
  cursor: pointer;
  font-size: 11px;
  font-weight: 500;
  margin-left: 0.25rem;
  opacity: ${({ disabled }) => (!disabled ? 1 : 0.4)};
  padding: 4px 6px;
  pointer-events: ${({ disabled }) => (!disabled ? "initial" : "none")};
  :hover {
    opacity: ${({ disabled }) => (!disabled ? 0.8 : 0.4)};
  }
  :focus {
    outline: none;
  }
`

export const NumericInput = _styled(NumericalInput)`
  filter: none;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  text-align: left;
`

export const LoadingOpacityContainer = styled.div<{ $loading: boolean }>`
  filter: ${({ $loading }) => ($loading ? "grayscale(1)" : "none")};
  opacity: ${({ $loading }) => ($loading ? "0.4" : "1")};
  transition: opacity 0.2s ease-in-out;
`

export const RowBetween = _styled(Row)`
    justify-content: space-between;
  `
