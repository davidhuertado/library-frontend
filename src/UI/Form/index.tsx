import React from 'react';
import { Button } from '@chakra-ui/react';

interface FormProps {
  children: React.ReactNode;
  buttonText: string;
  onSubmitFunc: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, buttonText, onSubmitFunc }: FormProps) => {
  return (
    <form onSubmit={(e) => onSubmitFunc(e)}>
      {children}
      <button type="submit">{buttonText}</button>
      <Button type="submit">{buttonText}</Button>
    </form>
  );
};

export default Form;
