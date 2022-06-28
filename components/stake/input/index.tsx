import { Box } from "@chakra-ui/react"

import { InputPanel, InputRow, NumericInput } from "./Styled"

type Props = {
  value: string
  onInput: (value: string) => void
}

export const CurrencyInput = ({ onInput, value, ...rest }: Props) => (
  <InputPanel {...rest}>
    <Box bg="inherit">
      <InputRow>
        <NumericInput value={value} onUserInput={onInput} />
      </InputRow>
    </Box>
  </InputPanel>
)
