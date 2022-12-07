import React from 'react';
// import Input from '../InputForm';
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
  // handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    <Form buttonText="Log In" onSubmitFunc={handleSubmit}>
      <Box>
        <FormControl isInvalid={isErrorUsername}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormErrorMessage>Username required</FormErrorMessage>
        </FormControl>
      </Box>
      <Box>
        <FormControl isInvalid={isErrorPassword}>
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
  );
};
export default LoginForm;
