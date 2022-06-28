import { useTheme, useToken } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { SwitchSize } from "./Base"

type SwitchHandlers = {
  setOn: () => void
  setOff: () => void
  toggle: () => void
  reset: () => void
}

export const useSwitch = (
  initialState: boolean = true
): [boolean, SwitchHandlers] => {
  const [state, setState] = useState<boolean>(initialState)

  const handlers = useMemo(
    () => ({
      setOn: () => {
        setState(true)
      },
      setOff: () => {
        setState(false)
      },
      toggle: () => {
        setState((on) => !on)
      },
      reset: () => {
        setState(initialState)
      },
    }),
    [initialState]
  )

  return [state, handlers]
}

type SwitchDimention = {
  track: {
    width: number
    height: number
    borderRadius: number
    padding: number
  }
  thumb: {
    width: number
    height: number
    borderRadius: string
  }
}

const sm = 0.8
const lg = 1.5

const dimensions: Record<SwitchSize, SwitchDimention> = {
  small: {
    track: {
      width: 59 * sm,
      height: 39 * sm,
      borderRadius: 40 * sm,
      padding: 2 * sm,
    },
    thumb: {
      width: 35 * sm,
      height: 35 * sm,
      borderRadius: "50%",
    },
  },
  medium: {
    track: {
      width: 50,
      height: 28,
      borderRadius: 16,
      padding: 2,
    },
    thumb: {
      width: 22,
      height: 22,
      borderRadius: "50%",
    },
  },
  large: {
    track: {
      width: 59 * lg,
      height: 39 * lg,
      borderRadius: 40 * lg,
      padding: 2 * lg,
    },
    thumb: {
      width: 35 * lg,
      height: 35 * lg,
      borderRadius: "50%",
    },
  },
}

export const useDimensions = (size: SwitchSize) => {
  const [purple, gray] = useToken("colors", ["purple.main", "gray.40"])

  const theme = {
    dimension: () => dimensions[size],
    animation: {
      duration: 0.3,
    },
    palette: {
      track: {
        active: purple,
        inActive: gray,
      },
      thumb: {
        background: "#ffffff",
        shadow: "0px 2px 4px rgb(0 0 0 / 20%);",
      },
    },
  }

  return {
    dimension: theme.dimension(),
    animation: theme.animation,
    palette: theme.palette,
  }
}
