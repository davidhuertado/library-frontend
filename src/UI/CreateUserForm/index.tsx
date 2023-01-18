import { FormEvent, useState } from 'react';
// import { setNotification, setError } from '../../reducers/notificationReducer';
import { useAppDispatch } from '../../hooks';
import { createUserAsync, setUserIdleStatus } from '../../reducers/userReducer';

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';
import Form from '../Form';

interface CreateUserFormProps {
  onCloseFunc: () => void;
}

const CreateUserForm = ({ onCloseFunc }: CreateUserFormProps) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleCreateUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createUserAsync({
        username: newUsername,
        password: newPassword,
      })
    );
    setNewUsername('');
    setNewPassword('');
    // dispatch(setNotification(`user ${newUser.username} created`));
    onCloseFunc();
    setTimeout(() => {
      dispatch(setUserIdleStatus(null));
    }, 5000);

    // dispatch(setError(err.response.data.error));
    // onCloseFunc();
    // setTimeout(() => {
    //   dispatch(setError(''));
    // }, 5000);
  };

  const isErrorUser = newUsername.length > 0 && newUsername.length < 4;
  const isErrorPassword = newUsername.length > 0 && newPassword.length < 4;
  return (
    <Form buttonText="Create" onSubmitFunc={handleCreateUserSubmit}>
      <Box mb="4">
        <FormControl isRequired isInvalid={isErrorUser}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            id="createUsernameInput"
          />
          <FormErrorMessage>
            Username needs a minimun of 4 characters
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Box mb="4">
        <FormControl isRequired isInvalid={isErrorPassword}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            id="createPasswordInput"
          />
          <FormErrorMessage>
            Password needs a minumun of 4 characters
          </FormErrorMessage>
        </FormControl>
      </Box>
    </Form>
  );
};

export default CreateUserForm;
