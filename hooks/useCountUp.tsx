import { useCountUp } from "react-countup"
import { useCountUpProps } from "react-countup/build/useCountUp"
import { usePreviousDistinct } from "react-use"

interface useManagedCountUpProps extends useCountUpProps {}

export const useManagedCountUp = (props: useManagedCountUpProps) =>
  useCountUp({
    start: usePreviousDistinct(props.end),
    separator: ",",
    decimals: 2,
    duration: 1,
    ...props,
  })
