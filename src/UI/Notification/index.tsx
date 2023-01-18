import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import { useAppSelector } from '../../hooks';

interface NotificationProps {
  message?: string;
  status?: any;
}

const Notification = ({ message, status }: NotificationProps) => {
  const userError = useAppSelector((state) => state.user.error);
  const userNotification = useAppSelector((state) => state.user.notification);

  const booksError = useAppSelector((state) => state.books.error);
  const booksNotification = useAppSelector((state) => state.books.notification);

  let error;
  let notification;

  if (userError) error = userError;
  else if (booksError) error = booksError;

  if (userNotification) notification = userNotification;
  else if (booksNotification) error = userNotification;

  if (notification) {
    return (
      <Box m="3" width="50%" display="flex" justifyContent="center">
        <Alert status={userError ? 'error' : 'success'}>
          <AlertIcon />
          {error || notification}
        </Alert>
      </Box>
    );
  } else return null;

  // return (
  //   <Alert status={status}>
  //     <AlertIcon />
  //     {message}
  //   </Alert>
  // );
};

export default Notification;
