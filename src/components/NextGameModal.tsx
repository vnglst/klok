import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { default as React, FC } from 'react'
import { GiLightBulb } from 'react-icons/gi'

interface NextGameModalProps {
  isOpen: boolean
  onClose: () => void
  pointsEarned: number
}

const NextGameModal: FC<NextGameModalProps> = ({
  isOpen,
  onClose,
  pointsEarned,
}) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="xs"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader as="h2" textAlign="center">
          Goed gedaan!
        </ModalHeader>
        <ModalBody textAlign="center">
          <Box
            mt={6}
            px="auto"
            width="100%"
            size={75}
            as={GiLightBulb}
            color="yellow.400"
          />
          <Text textAlign="center" fontSize="lg" my={10}>
            Je hebt de goede tijd geselecteerd. Daarmee heb je{' '}
            <b>{pointsEarned}</b> lampje(s) verdiend!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" size="md" onClick={onClose}>
            Volgende klok!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NextGameModal
