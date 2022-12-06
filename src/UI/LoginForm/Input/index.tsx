import React from 'react';

interface InputProps {
  type: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
  id?: string;
  value?: string | boolean;
}

const Input = ({
  type,
  name,
  onChange,
  labelText,
  id,
}: InputProps): JSX.Element => {
  if (labelText) {
    return (
      <label htmlFor={name}>
        {labelText}
        <input id={id} type={type} name={name} onChange={(e) => onChange(e)} />
      </label>
    );
  }

  return <input type={type} name={name} onChange={(e) => onChange(e)} />;
};

export default Input;
