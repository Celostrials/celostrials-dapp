import {
  Container,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"
import { memo } from "react"
import { StakeBody } from "./StakeBody"

interface StakeProps {
  isOpen: boolean
  onClose: () => void
  selected: string[]
  setSelected: (_selected: string[]) => void
}

export const StakeModal = memo(
  ({ isOpen, onClose, selected, setSelected }: StakeProps) => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInRight"
      >
        <ModalOverlay bg="black.blur" backdropFilter="blur(10px)" />
        <ModalContent>
          <StakeBody selected={selected} setSelected={setSelected} />
        </ModalContent>
      </Modal>
    )
  },
)

StakeModal.displayName = "StakeModal"
