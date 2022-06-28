import shallow from "zustand/shallow"
import { ToastStoreState, useToastStore } from "./store"
import { useCallback } from "react"
import { get } from "lodash"

const toastControlsSelector = (store: ToastStoreState) => ({
  addToast: store.show,
  removeToast: store.close,
  removeAll: store.closeAll,
})

export const useToastControls = () =>
  useToastStore(toastControlsSelector, shallow)

const activeToastsSelector = (store: ToastStoreState) => store.toasts
export const useActiveToasts = () => useToastStore(activeToastsSelector)

export const useActiveToast = (id: string) => {
  const { toast } = useToastStore(
    useCallback(
      (store) => ({
        toast: get(store.toasts, id) ?? {},
      }),
      [id]
    ),
    shallow
  )

  return toast
}
