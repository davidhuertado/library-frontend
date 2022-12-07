import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
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
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {headerContent}
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
