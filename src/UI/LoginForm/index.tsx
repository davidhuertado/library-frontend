import React, { useState } from 'react';
import Form from '../Form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../hooks';
import { logUserAsync, setUserIdleStatus } from '../../reducers/userReducer';

const LoginForm = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logUserAsync({ username, password }));
    setUsername('');
    setPassword('');
    setTimeout(() => {
      dispatch(setUserIdleStatus(null));
    }, 5000);
  };

  return (
    <Box
      minWidth="300px"
      borderWidth="1px"
      borderRadius="md"
      p="4"
      m="10"
      background="#fff"
    >
      <Form buttonText="Log In" onSubmitFunc={handleLogin}>
        <Box mb="4">
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="loginUsernameInput"
            />
            <FormErrorMessage>Username required</FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb="4">
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="loginPasswordInput"
            />
            <FormErrorMessage>Password required</FormErrorMessage>
          </FormControl>
        </Box>
      </Form>
    </Box>
  );
};
export default LoginForm;
