import { useConnectedSigner } from "@celo/react-celo"
import { ContractTransaction } from "ethers"
import { useCallback, useMemo } from "react"
import shallow from "zustand/shallow"

import {
  TransactionNotifier,
  TransactionStatusData,
} from "../../functions/notifier"
import { Emitter } from "../../functions/notifier/types"
import { useAddress, useChainId } from "../../hooks/useAccount"
import { useTransactionStore } from "./store"

export const useGetTransactions = () => {
  const { transactions } = useTransactionStore(
    (store) => ({
      transactions: store.transactions,
    }),
    shallow,
  )

  return transactions
}

export const useClearTransactions = () => {
  const { clear } = useTransactionStore(
    (store) => ({
      clear: store.clear,
    }),
    shallow,
  )

  return clear
}

export const useAddTransaction = () => {
  const id = useChainId()
  const from = useAddress()
  const signer = useConnectedSigner()

  const provider = signer?.provider
  const notifier = useMemo(() => new TransactionNotifier(provider!), [provider])

  const { add } = useTransactionStore(
    (store) => ({
      add: store.add,
    }),
    shallow,
  )

  return useCallback(
    (
      resp: ContractTransaction,
      {
        summary,
        approval,
        claim,
      }: {
        summary?: string
        claim?: { recipient: string }
        approval?: { tokenAddress: string; spender: string }
      },
    ) => {
      if (!id || !from) return

      const { hash } = resp

      if (hash && notifier) {
        addEvents(notifier.hash(hash))
      }

      add(id, hash, {
        from,
        addedTime: new Date().getTime(),
        summary,
        approval,
        claim,
      })
    },
    [add, from, id, notifier],
  )
}

export const useFinalizeTransaction = () => {
  const id = useChainId()

  const { finalize } = useTransactionStore(
    (store) => ({
      finalize: store.finalize,
    }),
    shallow,
  )

  return useCallback(
    ({ hash, chainId, receipt }) => {
      if (!id) return
      finalize({ hash, chainId, receipt })
    },
    [finalize, id],
  )
}

export const useCheckTransaction = () => {
  const id = useChainId()

  const { check } = useTransactionStore(
    (store) => ({
      check: store.check,
    }),
    shallow,
  )

  return useCallback(
    ({ hash, chainId, blockNumber }) => {
      if (!id) return

      check({ hash, chainId, blockNumber })
    },
    [check, id],
  )
}

const addEvents = (emitter: Emitter): void => {
  emitter.on("txSent", () => {
    console.log("txSent")
  })

  emitter.on("txConfirmed", ({ transactionHash }: TransactionStatusData) => {
    console.log("Notifier.tsx -- txConfirmed:", { hash: transactionHash })
  })

  emitter.on(
    "txFailed",
    ({ transactionHash, failureReason }: TransactionStatusData) => {
      console.log("Notifier.tsx -- transactionHash, failureReason:", {
        transactionHash,
        failureReason,
      })
    },
  )
}
