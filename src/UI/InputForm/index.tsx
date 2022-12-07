// import React from 'react';
import { Input, FormLabel } from '@chakra-ui/react';

interface InputFormProps {
  labelText: string;
  type: string;
  value: string;
  onChangeFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputForm = ({
  labelText,
  type,
  value,
  onChangeFunc,
}: InputFormProps) => {
  return (
    <>
      <FormLabel>{labelText}</FormLabel>
      <Input type={type} value={value} onChange={onChangeFunc} />
    </>
  );
};

export default InputForm;
