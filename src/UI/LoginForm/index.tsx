import React from 'react';
import Input from '../Input';

interface LoginFormProps {
  username: string;
  password: string;
  // setUser: React.Dispatch<React.SetStateAction<string>>;
  // setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}: LoginFormProps): JSX.Element => {
  return (
    <form className="form form--login" onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="text"
        name="Username"
        labelText="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <Input
        type="password"
        name="Password"
        labelText="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};
export default LoginForm;
