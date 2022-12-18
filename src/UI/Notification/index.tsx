import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

interface NotificationProps {
  message?: string;
  status?: any;
}

const Notification = ({ message, status }: NotificationProps) => {
  console.log(message, status);
  return (
    <Alert status={status}>
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default Notification;
