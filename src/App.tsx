import React, { useState, useEffect } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import LoginForm from './UI/LoginForm';
import Notification from './UI/Notification';
import BookCard from './UI/BookCard';
import ModalForm from './UI/ModalForm';
import CreateUserForm from './UI/CreateUserForm';

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

  //For create user Modal
  const {
    isOpen: isCreateUserOpen,
    onOpen: onCreateUserOpen,
    onClose: onCreateUserClose,
  } = useDisclosure();

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
        }) => book.user.username === user!.username
      );
      setBooks(filteredByUser);
      console.log(data);
      console.log(user);
    };

    if (user) fetchBooks();
  }, [user]);

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
      setUsername('');
      setPassword('');
      setError('invalid username or password');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  if (!user) {
    return (
      <div className="App">
        {/* modal for creating user */}
        <ModalForm
          isOpen={isCreateUserOpen}
          onOpen={onCreateUserClose}
          onClose={onCreateUserClose}
          bodyContent={<CreateUserForm onCloseFunc={onCreateUserClose} />}
        />
        {notification ? (
          <Notification status="sucess" message={notification} />
        ) : null}
        {error ? <Notification status="error" message={error} /> : null}
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleLogin}
        />

        <Button onClick={onCreateUserOpen}>Create user</Button>
      </div>
    );
  }

  return (
    <div className="App">
      {books.map(({ title, author, year, read }) => {
        return (
          <BookCard title={title} author={author} year={year} read={read} />
        );
      })}
    </div>
  );
}

export default App;
