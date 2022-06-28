import { Box, BoxProps, useBreakpointValue } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, useEffect } from "react"

import { ToastState, useActiveToast, useToastControls } from "../../state"

const variants = {
  fadeLeft: {
    initial: {
      opacity: 0,
      x: "100%",
    },

    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: "100%",
    },
  },
  fadeUp: {
    initial: {
      opacity: 0,
      y: 12,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: "-100%",
    },
  },
}

const MotionBox = motion(Box)

interface ToastProps extends ToastState, BoxProps {
  duration: number
  children: ReactNode
}

export const Toast = ({
  toastId,
  location,
  direction,
  duration,
  children,
  ...rest
}: ToastProps) => {
  const { removeToast } = useToastControls()
  const active = useActiveToast(toastId).isActive
  const isMobile = useBreakpointValue({ base: true, md: false })

  useEffect(() => {
    if (!duration) {
      return
    }

    const timeoutId = setTimeout(() => {
      removeToast({ toastId })
    }, duration)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [toastId, active, duration, removeToast])

  return (
    <AnimatePresence>
      {active && (
        <MotionBox
          {...getToastStyle(location ?? "top-right")}
          variants={variants[direction ?? "fadeUp"]}
          key={toastId}
          initial="initial"
          animate="animate"
          exit="exit"
          justifyContent="space-around"
          alignItems="center"
          h="105px"
          w={isMobile ? "-webkit-fill-available" : "450px"}
          ml={isMobile ? "1em" : ""}
          {...rest}
        >
          {children}
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

const getToastStyle = (position: string) => {
  const isTopOrBottom = position === "top" || position === "bottom"
  const margin = isTopOrBottom ? "0 auto" : undefined

  const top = position.includes("top") ? "5rem" : undefined
  const bottom = position.includes("bottom") ? "0px" : undefined
  const right = !position.includes("left") ? "0.5rem" : undefined
  const left = !position.includes("right") ? "0px" : undefined

  return {
    position: "fixed",
    zIndex: 5500,
    display: "flex",
    flexDirection: "column",
    py: "1rem",
    margin,
    top,
    bottom,
    right,
    left,
  }
}
