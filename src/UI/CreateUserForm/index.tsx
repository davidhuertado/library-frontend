import React, { FormEvent, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';
import Form from '../Form';
import userService from '../../services/user.service';

interface CreateUserFormProps {
  onCloseFunc: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
}

const CreateUserForm = ({
  onCloseFunc,
  setError,
  setNotification,
}: CreateUserFormProps) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCreateUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const newUser = await userService.create({
        username: newUsername,
        password: newPassword,
      });

      setNewUsername('');
      setNewPassword('');
      onCloseFunc();
      setNotification(`user ${newUser.username} created`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    } catch (err: any) {
      setError(err.response.data.error);
      onCloseFunc();
      setTimeout(() => {
        setError('');
      }, 5000);
    }
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
          />
          <FormErrorMessage>
            Username needs a minimun of 4 characters
          </FormErrorMessage>
        </FormControl>
      </Box>
      <Box mb="4">
        <FormControl isRequired isInvalid={isErrorPassword}>
          <FormLabel>Password needs a minimun of 4 characters</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormErrorMessage>Password required</FormErrorMessage>
        </FormControl>
      </Box>
    </Form>
  );
};

export default CreateUserForm;
