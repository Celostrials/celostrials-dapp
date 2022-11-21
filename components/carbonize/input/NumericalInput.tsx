import { memo } from "react"
import { styled } from "../../../styles/theme"

export const StyledInput = styled.input<{
  error?: boolean
  fontSize?: string
  align?: string
}>`
  color: ${({ error, theme }) => (error ? "#000000" : "#FFFFFF")};
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  box-shadow: none !important;
  flex: 1 1 auto;
  background-color: inherit;
  font-size: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  text-align: right;
  ::focus {
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  [type="number"] {
    -moz-appearance: textfield;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: #b2b9d2;
  }
`

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

export const NumericalInput = memo(
  ({
    value,
    onUserInput,
    placeholder,
    prependSymbol,
    ...rest
  }: {
    value: string | number
    onUserInput: (input: string) => void
    error?: boolean
    fontSize?: string
    align?: "right" | "left"
    prependSymbol?: string | undefined
  } & Omit<React.HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as">) => {
    const enforcer = (nextUserInput: string) => {
      if (
        nextUserInput === "" ||
        inputRegex.test(escapeRegExp(nextUserInput))
      ) {
        onUserInput(nextUserInput)
      }
    }

    return (
      <StyledInput
        {...rest}
        value={prependSymbol && value ? prependSymbol + value : value}
        onChange={(event) => {
          if (prependSymbol) {
            const value = event.target.value

            // cut off prepended symbol
            const formattedValue = value.toString().includes(prependSymbol)
              ? value.toString().slice(1, value.toString().length + 1)
              : value

            // replace commas with periods, because uniswap exclusively uses period as the decimal separator
            enforcer(formattedValue)
          } else {
            enforcer(event.target.value)
          }
        }}
        // universal input options
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        // text-specific options
        type="text"
        pattern="^[0-9]*[.,]?[0-9]*$"
        placeholder={placeholder || "0.0"}
        minLength={1}
        maxLength={35}
        spellCheck="false"
      />
    )
  }
)

NumericalInput.displayName = "NumericalInput"

export const StakeInput = styled(NumericalInput)<{ $loading: boolean }>`
  filter: ${({ $loading }) => ($loading ? "grayscale(1)" : "none")};
  opacity: ${({ $loading }) => ($loading ? "0.4" : "1")};
  transition: opacity 0.2s ease-in-out;
  text-align: left;
`
