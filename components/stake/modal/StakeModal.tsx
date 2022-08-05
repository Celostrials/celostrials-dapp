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
  openRewards: boolean
}

export const StakeModal = memo(
  ({ isOpen, onClose, selected, setSelected, openRewards }: StakeProps) => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInRight"
      >
        <ModalOverlay bg="black.blur" backdropFilter="blur(10px)" />
        <ModalContent>
          <StakeBody
            selected={selected}
            setSelected={setSelected}
            openRewards={openRewards}
          />
        </ModalContent>
      </Modal>
    )
  },
)

StakeModal.displayName = "StakeModal"
