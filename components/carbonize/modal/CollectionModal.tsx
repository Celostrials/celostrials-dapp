import {
  Container,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { memo } from "react"
import { CarbonizeBody } from "./CarbonizeBody"
import { CarbonizedBody } from "./CarbonizedBody"

interface CollectionModalProps {
  isOpen: boolean
  onClose: () => void
  setFetched: (val: boolean) => void
  tokenId: string
  carbonize: boolean
}

export const CollectionModal = memo(
  ({
    isOpen,
    onClose,
    setFetched,
    tokenId,
    carbonize,
  }: CollectionModalProps) => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInRight"
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bgColor={"#303030"}>
          {carbonize ? (
            <>
              <ModalHeader alignSelf={"center"} color="white">
                Carbonize #{tokenId}
              </ModalHeader>
              <CarbonizeBody tokenId={tokenId} setFetched={setFetched} />
            </>
          ) : (
            <>
              <ModalHeader alignSelf={"center"} color="white">
                #{tokenId}
              </ModalHeader>
              <CarbonizedBody tokenId={tokenId} onClose={onClose} />
            </>
          )}
        </ModalContent>
      </Modal>
    )
  },
)

CollectionModal.displayName = "CollectionModal"
