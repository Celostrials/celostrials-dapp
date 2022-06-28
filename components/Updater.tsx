import { useCelo, useProvider } from "@celo/react-celo"
import { get, has } from "lodash"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useInterval } from "react-use"
import { useToastControls } from "../state"

import {
  useCheckTransaction,
  useFinalizeTransaction,
  useGetTransactions,
} from "../state/transactions"
import { TransactionState } from "../state/transactions/store"

export function shouldCheck(
  lastBlockNumber: number,
  tx: TransactionState,
): boolean {
  if (has(tx, "receipt")) return false
  if (!has(tx, "lastCheckedBlockNumber")) return true

  const blocksSinceCheck =
    lastBlockNumber - (get(tx, "lastCheckedBlockNumber") as number)

  if (blocksSinceCheck < 1) return false

  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60

  if (minutesPending > 60) {
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    return blocksSinceCheck > 2
  } else {
    return true
  }
}

export function Updater(): null {
  const { network } = useCelo()
  const chainId = network.chainId ?? 0

  const provider = useProvider()

  const finalize = useFinalizeTransaction()
  const check = useCheckTransaction()
  const { addToast } = useToastControls()
  const [blockNumber, setBlockNumber] = useState(0)

  useInterval(() => {
    async function handler() {
      console.log("blocknumber: " + (await provider.getBlockNumber()))
      setBlockNumber(await provider.getBlockNumber())
    }
    handler()
  }, 5000)

  const state = useGetTransactions()

  const transactions = useMemo(
    () => (chainId ? state[chainId] ?? {} : {}),
    [chainId, state],
  )

  useEffect(() => {
    if (!chainId || !provider || !blockNumber) return

    Object.keys(transactions)
      .filter((hash: any) => shouldCheck(blockNumber, transactions[hash]))
      .forEach((hash) => {
        provider
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              finalize({
                chainId,
                hash,
                receipt: {
                  blockHash: receipt.blockHash,
                  blockNumber: receipt.blockNumber,
                  contractAddress: receipt.contractAddress,
                  from: receipt.from,
                  status: receipt.status,
                  to: receipt.to,
                  transactionHash: receipt.transactionHash,
                  transactionIndex: receipt.transactionIndex,
                },
              })

              addToast({
                toastId: hash,
                content: {
                  txn: {
                    hash,
                    success: receipt.status === 1,
                    summary: transactions[hash]?.summary,
                  },
                },
              })
            } else {
              check({
                chainId,
                hash,
                blockNumber: blockNumber,
              })
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, provider, transactions, addToast, blockNumber, check, finalize])

  return null
}
