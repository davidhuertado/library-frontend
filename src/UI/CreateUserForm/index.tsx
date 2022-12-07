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
}

const CreateUserForm = ({ onCloseFunc }: CreateUserFormProps) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleCreateUserSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const newUser = await userService.create({
        username: newUsername,
        password: newPassword,
      });
      console.log(newUser);
      setNewUsername('');
      setNewPassword('');
      onCloseFunc();
    } catch (err) {
      console.error(err);
    }
  };

  const isErrorUser = newUsername === '';
  const isErrorPassword = newPassword === '';
  return (
    <Form buttonText="create" onSubmitFunc={handleCreateUserSubmit}>
      <Box>
        <FormControl isInvalid={isErrorUser}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <FormErrorMessage>Username required</FormErrorMessage>
        </FormControl>
      </Box>
      <Box>
        <FormControl isInvalid={isErrorPassword}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormErrorMessage>Username required</FormErrorMessage>
        </FormControl>
      </Box>
    </Form>
  );
};

export default CreateUserForm;
