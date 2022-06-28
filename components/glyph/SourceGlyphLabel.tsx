import { Text } from "@chakra-ui/layout"
import { chakra, ChakraProps } from "@chakra-ui/system"
import colors from "../../styles/theme/foundations/colors"
import { SourceGlyph } from "./SourceGlyph"

export interface GlyphLabelProps extends ChakraProps {
  value?: number | null | string
  id?: string
}

export const GlyphLabel = (props: GlyphLabelProps) => {
  const { value, id, ...rest } = props

  return (
    <chakra.span {...rest} whiteSpace="nowrap">
      <Label id={id} value={value} {...rest} />
      <Glyph {...rest} />
    </chakra.span>
  )
}

const Glyph = (props: GlyphLabelProps) => {
  return props.color === colors.blue.main ? (
    <SourceGlyph boxSize="12px" display="initial" pt={1} {...(props as any)} />
  ) : (
    <SourceGlyph boxSize="18px" display="initial" pt={1} {...(props as any)} />
  )
}

const Label = (props: GlyphLabelProps) => {
  const { value, id } = props
  const numberValue = typeof value === "string" ? parseFloat(value) : value ?? 0
  if (isNaN(numberValue)) throw new Error("could not parse Glyph value")
  const formattedValue = walletValueToString(numberValue)

  return (
    <Text id={id} as="span" variant="number" color={props.textColor} {...props}>
      {formattedValue}
    </Text>
  )
}

type OptionsType = { decimals: number }
export const walletValueToString = (val: number, options?: OptionsType) => {
  return (
    val?.toLocaleString(undefined, {
      minimumFractionDigits: options?.decimals ?? 2,
      maximumFractionDigits: options?.decimals ?? 2,
    }) ?? "0.00"
  )
}
