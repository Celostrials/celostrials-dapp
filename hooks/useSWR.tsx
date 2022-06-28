import useNativeSWR from "swr"

import { useRef } from "react"
import { SWRResponse } from "swr"

export function useNoCacheSWR<T>(
  key: any,
  fetcher: any,
  options = { cachePolicy: "no-cache" }
): SWRResponse<T> {
  const { cachePolicy, ...opts } = options
  const random = useRef(new Date())

  return useNativeSWR(
    () => {
      const shouldAvoidCache = cachePolicy === "no-cache"
      if (!shouldAvoidCache) {
        return typeof key === "function" ? key() : key
      }
      let finalKey = key
      if (typeof key === "function") finalKey = key()
      if (!Array.isArray(finalKey)) finalKey = [finalKey]

      return [...finalKey, random]
    },
    fetcher,
    opts
  )
}
