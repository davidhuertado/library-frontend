import React from 'react';
import Form from '../Form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
} from '@chakra-ui/react';

interface LoginFormProps {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({
  username,
  password,
  handleSubmit,
  setUsername,
  setPassword,
}: LoginFormProps): JSX.Element => {
  const isErrorUsername = username === '';
  const isErrorPassword = password === '';
  return (
    <Box minWidth="300px" borderWidth="1px" borderRadius="md" p="4" m="10">
      <Form buttonText="Log In" onSubmitFunc={handleSubmit}>
        <Box mb="4">
          <FormControl isRequired isInvalid={isErrorUsername}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormErrorMessage>Username required</FormErrorMessage>
          </FormControl>
        </Box>
        <Box mb="4">
          <FormControl isRequired isInvalid={isErrorPassword}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>Password required</FormErrorMessage>
          </FormControl>
        </Box>
      </Form>
    </Box>
  );
};
export default LoginForm;
