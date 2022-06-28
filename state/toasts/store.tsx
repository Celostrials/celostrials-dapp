export * from "./hooks"
import create from "zustand"
import { merge, omit } from "lodash"
import { isSupported, share } from "shared-zustand"

export type Position =
  | "top"
  | "top-right"
  | "top-left"
  | "bottom"
  | "bottom-right"
  | "bottom-left"
export type Direction = "fadeUp" | "fadeLeft"
export type ToastState = {
  toastId: string
  location?: Position
  direction?: Direction
  isActive?: boolean
  content?: {
    txn?: {
      hash?: string
      success?: boolean
      summary?: string
    }
  }
}

export type ToastStoreState = {
  toasts: Record<string, ToastState>
  show: ({ toastId, location, direction, content }: ToastState) => void
  close: ({ toastId }: { toastId: string }) => void
  closeAll: () => void
}

export const useToastStore = create<ToastStoreState>((set, get) => ({
  toasts: {},
  show: ({ toastId, location, direction, content }: ToastState) => {
    const { toasts } = get()
    set({
      toasts: merge(
        {
          [toastId]: {
            toastId: toastId,
            isActive: true,
            content: content ?? {},
            position: location ?? "top-right",
            direction: direction ?? "fadeUp",
          },
        },
        toasts
      ),
    })
  },
  close: ({ toastId }: { toastId: string }) => {
    const { toasts } = get()
    set({ toasts: omit(toasts, toastId) })
  },
  closeAll: () => {
    set({ toasts: {} })
  },
}))

if (isSupported()) {
  share("toasts", useToastStore)
}
