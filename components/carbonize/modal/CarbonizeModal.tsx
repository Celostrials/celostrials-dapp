import {
  Container,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { memo } from "react"
import { CarbonizationBody } from "./CarbonizationBody"
import { DecarbonizationBody } from "./DecarbonizationBody"

interface CarbonizeModalProps {
  isOpen: boolean
  onClose: () => void
  setFetched: (val: boolean) => void
  tokenId: string
  carbonize: boolean
}

export const CarbonizeModal = memo(
  ({
    isOpen,
    onClose,
    setFetched,
    tokenId,
    carbonize,
  }: CarbonizeModalProps) => {
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
              <CarbonizationBody tokenId={tokenId} setFetched={setFetched} />
            </>
          ) : (
            <>
              <ModalHeader alignSelf={"center"} color="white">
                #{tokenId}
              </ModalHeader>
              <DecarbonizationBody tokenId={tokenId} />
            </>
          )}
        </ModalContent>
      </Modal>
    )
  },
)

CarbonizeModal.displayName = "CarbonizeModal"
