import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks';

interface NotificationProps {
  message?: string;
  status?: any;
}

const Notification = ({ message, status }: NotificationProps) => {
  const userError = useAppSelector((state) => state.user.error);
  const userNotification = useAppSelector((state) => state.user.notification);
  console.log(userNotification);

  const booksError = useAppSelector((state) => state.books.error);
  const booksNotification = useAppSelector((state) => state.books.notification);
  console.log(booksNotification);

  let error;
  let notification;

  if (userError) error = userError;
  else if (booksError) error = booksError;

  if (userNotification) notification = userNotification;
  else if (booksNotification) notification = booksNotification;

  if (notification) {
    return (
      <Box m="3" width="50%" display="flex" justifyContent="center">
        <Alert status={error ? 'error' : 'success'}>
          <AlertIcon />
          {notification}
        </Alert>
      </Box>
    );
  }
  return null;
};

export default Notification;
