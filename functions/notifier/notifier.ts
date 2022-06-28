import { ethers } from "ethers"

import { getRevertReason } from "./revert"
import { keyBy } from "lodash"
import {
  Emitter,
  TransactionEventCode,
  TransactionNotifierInterface,
} from "./types"

export const TRANSACTION_EVENTS: TransactionEventCode[] = [
  "txSent",
  "txConfirmed",
  "txFailed",
  "txError",
]
export const TRANSACTION_EVENTS_MAP = keyBy(TRANSACTION_EVENTS)

export function createEmitter(): Emitter {
  return {
    listeners: {},
    on: function (eventCode, listener) {
      switch (eventCode) {
        case "txSent":
        case "txConfirmed":
        case "txFailed":
        case "txError":
          break
        default:
          throw new Error("Not a valid event")
      }
      if (typeof listener !== "function") {
        throw new Error("Listener must be a function")
      }
      this.listeners[eventCode] = listener
    },
    emit: function (eventCode, data) {
      if (this.listeners[eventCode]) {
        return this.listeners[eventCode](data)
      }
    },
  }
}

export class TransactionNotifier implements TransactionNotifierInterface {
  private _provider: ethers.providers.BaseProvider

  constructor(provider: ethers.providers.BaseProvider) {
    this._provider = provider
  }

  hash(transactionHash: string): Emitter {
    const emitter = createEmitter()
    setTimeout(() => this.watchTransaction(transactionHash, emitter), 5)
    return emitter
  }

  setProvider(provider: ethers.providers.BaseProvider): void {
    this._provider = provider
  }

  watchTransaction(transactionHash: string, emitter: Emitter): void {
    emitter.emit(TRANSACTION_EVENTS_MAP.txSent, { transactionHash })
    this._provider
      .waitForTransaction(transactionHash)
      .then(({ status, blockNumber, transactionHash }) => {
        if (status === 1) {
          emitter.emit(TRANSACTION_EVENTS_MAP.txConfirmed, {
            status,
            blockNumber,
            transactionHash,
          })
        } else {
          setTimeout(() => {
            this._provider.getNetwork().then(({ chainId }) => {
              try {
                getRevertReason({
                  txHash: transactionHash,
                  networkId: chainId,
                  blockNumber,
                  provider: this._provider,
                }).then((revertReason) =>
                  emitter.emit(TRANSACTION_EVENTS_MAP.txFailed, {
                    transactionHash,
                    failureReason: revertReason,
                  })
                )
              } catch (e) {
                emitter.emit(TRANSACTION_EVENTS_MAP.txFailed, {
                  transactionHash,
                  failureReason: "Transaction reverted for an unknown reason",
                })
              }
            })
          }, 5000)
        }
      })
  }
}
