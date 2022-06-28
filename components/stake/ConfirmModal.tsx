import {
  Box,
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { EmotionJSX } from "@emotion/react/types/jsx-namespace"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memo } from "react"

interface StakeProps {
  isOpen: boolean
  onClose: () => void
  rewards: {
    token: string
    amount: string
    icon: EmotionJSX.Element
  }[]
  onClaim: () => Promise<void>
  claimLoading: boolean
}

export const ConfirmModal = memo(
  ({ isOpen, onClose, rewards, onClaim, claimLoading }: StakeProps) => {
    const handleClaim = async () => {
      await onClaim()
      onClose()
    }

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInRight"
      >
        <ModalOverlay bg="black.blur" backdropFilter="blur(5px)" />
        <ModalContent
          border="1px solid gray.800"
          borderStyle="solid"
          borderRadius="8px"
          bg="black.dark"
          height="2xs"
        >
          <ModalHeader color="white" fontSize="xl" fontWeight="500">
            <Box>
              <HStack>
                <HStack>
                  <Text fontSize="lg">Claim</Text>
                </HStack>
                <Box>
                  <ModalCloseButton mt={2} />
                </Box>
              </HStack>
            </Box>
          </ModalHeader>
          <ModalBody pt="0">
            <Divider />
            <Box borderRadius="3xl" px={2} pt={4} pb={2} mb={3}>
              {rewards &&
                rewards.map((r, idx) => (
                  <HStack
                    key={idx}
                    display="flex"
                    justifyContent="space-between"
                    pt="2"
                  >
                    <HStack>
                      <Text fontSize="lg">{r.amount}</Text>
                      <Text fontSize="lg" color="gray.40">
                        {r.token}
                      </Text>
                    </HStack>
                    {r.icon}
                  </HStack>
                ))}
            </Box>
            <Divider />
          </ModalBody>
          <ModalFooter>
            <Box w="full">
              <Button
                isLoading={claimLoading}
                variant="gradient"
                w="full"
                onClick={handleClaim}
              >
                Confirm and claim tokens
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  },
)

ConfirmModal.displayName = "ConfirmModal"
