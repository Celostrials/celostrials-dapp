import React from "react"
import styled from "@emotion/styled"
import { Plus, Minus } from "@emotion-icons/heroicons-solid"

import { Base, SwitchProps } from "./Base"
import { useDimensions } from "./hooks"

export const Switch = ({ on, size, ...rest }: SwitchProps) => {
  const { animation, dimension, palette } = useDimensions(size || "medium")

  const PlusIcon = styled(Plus)`
    color: ${palette.track.active};
  `
  const MinusIcon = styled(Minus)`
    color: ${palette.track.inActive};
  `

  return (
    <Base
      animationDuration={animation.duration}
      endAnimationX={
        dimension.track.width -
        dimension.thumb.width -
        dimension.track.padding * 2
      }
      trackCss={`
        box-sizing: border-box;
        display: inline-flex;
        width: ${dimension.track.width}px;
        height: ${dimension.track.height}px;
        align-items: center;
        padding: ${dimension.track.padding}px; 
        border-radius: ${dimension.track.borderRadius}px;
        transition: all ${animation.duration}s;
        transition-property: background-color, box-shadow;
        background-color: ${on ? palette.track.active : palette.track.inActive};
      `}
      thumbCss={`
        box-sizing: border-box;
        background-color: ${palette.thumb.background};
        display: flex;
        height: ${dimension.thumb.height}px;
        width: ${dimension.thumb.width}px;
        border-radius: ${dimension.thumb.borderRadius};
        transition: box-shadow ${animation.duration}s;
        box-shadow: ${palette.thumb.shadow};
      `}
      icon={on ? <PlusIcon /> : <MinusIcon />}
      on={on}
      {...rest}
    />
  )
}
