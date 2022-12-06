import React, { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';
import LoginForm from './UI/LoginForm';
import Notification from './UI/Notification';
import BookCard from './UI/BookCard';
import Form from './UI/Form';
// import Input from './UI/Input';

import loginServices from './services/login.service';
import booksServices from './services/book.service';
import './App.css';

interface User {
  token: string;
  username: string;
  id: string;
}

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await booksServices.getAll();
      console.log(data);
      const filteredByUser = data.filter(
        (book: {
          title: string;
          author: string;
          year: string;
          read: boolean;
          user: {
            username: string;
            token: string;
            id: string;
          };
        }) => book.user.username === user.username
      );
      setBooks(filteredByUser);
      console.log(data);
      console.log(user);
    };

    if (user) fetchBooks();
  }, [user]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const user = await loginServices.login({ username, password });
      console.log(user);
      setUser(user);
      setNotification(`${user.username} logged in`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setError('invalid username or password');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  if (!user) {
    return (
      <div className="App">
        {notification ? (
          <Notification status="sucess" message={notification} />
        ) : null}
        {error ? <Notification status="error" message={error} /> : null}
        {/* <LoginForm
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
        /> */}
        <FormControl>
          <form onSubmit={(e) => handleLogin(e)}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <Button type="submit">Login</Button>
          </form>
        </FormControl>
        <Button>Create user</Button>
        {/*//   <Input
        //     type="text"
        //     name="Username"
        //     labelText="Username"
        //     value={username}
        //     onChange={handleUsernameChange}
        //   />
        //   <Input
        //     type="password"
        //     name="Password"
        //     labelText="Password"
        //     value={password}
        //     onChange={handlePasswordChange}
        //   />
        // </Form>
        */}
      </div>
    );
  }

  return (
    <div className="App">
      {/* {notification ? (
        <Notification status="sucess" message={notification} />
      ) : null}
      {error ? <Notification status="error" message={error} /> : null} */}
      {books.map(({ title, author, year, read }) => {
        return (
          <BookCard title={title} author={author} year={year} read={read} />
        );
      })}
    </div>
  );
}

export default App;
