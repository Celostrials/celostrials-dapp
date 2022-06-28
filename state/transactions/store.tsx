import { get as getKey, isEmpty, merge, update } from "lodash"
import create from "zustand"
import { persist } from "zustand/middleware"

export type TxReceipt = {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export type TransactionState = {
  from: string
  summary?: string
  addedTime: number
  confirmedTime?: number
  contractAddress?: string
  claim?: { recipient: string }
  approval?: { tokenAddress: string; spender: string }
  receipt?: TxReceipt
  lastCheckedBlockNumber?: number
}

export type Transactions = {
  [chainId: number]: { [hash: string]: TransactionState }
}

export type TransactionStoreState = {
  transactions: Transactions
  get: () => Transactions
  clear: () => void
  add: (chainId: number, hash: string, transaction: TransactionState) => void
  check: ({
    chainId,
    hash,
    blockNumber,
  }: {
    chainId: number
    hash: string
    blockNumber: number
  }) => void
  finalize: ({
    hash,
    chainId,
    receipt,
  }: {
    hash: string
    chainId: number
    receipt: TxReceipt
  }) => void
}

const now = () => new Date().getTime()

export const useTransactionStore = create<TransactionStoreState>(
  persist(
    (set, get) => ({
      transactions: {} as Transactions,
      get: () => get().transactions,
      clear: () => set({ transactions: {} }),
      check: ({ chainId, hash, blockNumber }) => {
        const { transactions } = get()
        const transaction = getKey(transactions, [chainId, hash])

        if (isEmpty(transaction)) return

        if (transaction && !transaction.lastCheckedBlockNumber)
          set({
            transactions: update(
              transactions,
              [chainId, hash, "lastCheckedBlockNumber"],
              () => blockNumber
            ),
          })
        else {
          const latest =
            (transaction && transaction.lastCheckedBlockNumber) || 0
          set({
            transactions: update(
              transactions,
              [chainId, hash, "lastCheckedBlockNumber"],
              () => Math.max(blockNumber, latest)
            ),
          })
        }
      },
      finalize: ({ hash, chainId, receipt }) => {
        const { transactions } = get()

        set({
          transactions: update(transactions, [chainId, hash], (t) => ({
            ...t,
            receipt: receipt,
            confirmedTime: now(),
          })),
        })
      },
      add: (
        chainId,
        hash,
        {
          from,
          summary,
          addedTime,
          confirmedTime,
          contractAddress,
          claim,
          approval,
        }
      ) => {
        const { transactions } = get()
        const transaction = getKey(transactions, [chainId, hash])

        if (!isEmpty(transaction)) return

        set({
          transactions: merge(
            {
              [chainId]: {
                [hash]: {
                  from,
                  summary,
                  addedTime,
                  confirmedTime,
                  contractAddress,
                  claim,
                  approval,
                },
              },
            },
            transactions
          ),
        })
      },
    }),
    {
      name: "recent-transactions",
      getStorage: () => localStorage,
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
)
