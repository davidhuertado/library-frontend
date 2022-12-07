import React from 'react';
import { Button, Box } from '@chakra-ui/react';

interface FormProps {
  children: React.ReactNode;
  buttonText: string;
  onSubmitFunc: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, buttonText, onSubmitFunc }: FormProps) => {
  return (
    <Box>
      <form onSubmit={(e) => onSubmitFunc(e)}>
        <Box>{children}</Box>
        <Box>
          <Button type="submit">{buttonText}</Button>
        </Box>
      </form>
    </Box>
  );
};

export default Form;
