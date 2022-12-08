import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';
import Form from '../Form';

interface ModalFormProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  headerContent?: React.ReactNode;
  bodyContent?: React.ReactNode;
  buttonText?: string;
}

const ModalForm = ({
  onOpen,
  onClose,
  isOpen,
  headerContent,
  bodyContent,
}: ModalFormProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {headerContent}
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>{bodyContent}</ModalBody>
        </ModalContent>
      </Box>
    </Modal>
  );
};

export default ModalForm;
