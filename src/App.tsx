import React, { useState, useEffect } from 'react';
import {
  Button,
  useDisclosure,
  Box,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';
import LoginForm from './UI/LoginForm';
import Notification from './UI/Notification';
import BookCard from './UI/BookCard';
import ModalForm from './UI/ModalForm';
import CreateUserForm from './UI/CreateUserForm';
import CreateBookForm from './UI/CreateBookForm';

import loginServices from './services/login.service';
import booksServices from './services/book.service';

import backgroundSpace from './assets/images/vincentiu-solomon-ln5drpv_ImI-unsplash.jpg';
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
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  //For create user Modal
  const {
    isOpen: isCreateUserOpen,
    onOpen: onCreateUserOpen,
    onClose: onCreateUserClose,
  } = useDisclosure();
  const {
    isOpen: isCreateBookOpen,
    onOpen: onCreateBookOpen,
    onClose: onCreateBookClose,
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedLibraryUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleToggleRead = async (id: string) => {
    const book = books.find((book) => book.id === id);
    const modifiedBook = { ...book, read: !book.read };
    try {
      const returnedBook = await booksServices.toggleRead(id, modifiedBook);
      console.log(returnedBook);
      const newBooks = books.map((book) =>
        book.id !== id ? book : { ...returnedBook, user: book.user }
      );

      setBooks(newBooks);
    } catch (err) {
      setError('Error put method');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const user = await loginServices.login({ username, password });

      window.localStorage.setItem('loggedLibraryUser', JSON.stringify(user));
      booksServices.setToken(user.token);
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
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        h="100vh"
        backgroundImage={backgroundSpace}
        backgroundSize="100%"
      >
        {/* modal for creating user */}
        <ModalForm
          isOpen={isCreateUserOpen}
          onOpen={onCreateUserOpen}
          onClose={onCreateUserClose}
          bodyContent={
            <CreateUserForm
              setNotification={setNotification}
              setError={setError}
              onCloseFunc={onCreateUserClose}
            />
          }
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
        <Box mb="4">
          <Button variant="secondary" onClick={onCreateUserOpen}>
            Create user
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      p="9"
      w="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      h="100vh"
    >
      <Box w="100%" display="flex" alignItems="center">
        <Box ml="">
          <Heading>{user.username}'s library</Heading>
        </Box>
        <Button m="0 0 0 auto" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      {/* modal for creating book */}
      <ModalForm
        isOpen={isCreateBookOpen}
        onOpen={onCreateBookOpen}
        onClose={onCreateBookClose}
        bodyContent={
          <CreateBookForm
            setNotification={setNotification}
            setError={setError}
            onCloseFunc={onCreateBookClose}
            user={user}
            books={books}
            setBooks={setBooks}
          />
        }
      />
      <SimpleGrid w="100%" spacing="30px" columns={{ sm: 1, md: 4 }}>
        {books.map(({ title, author, year, read, id }) => {
          return (
            <BookCard
              handleToggleRead={handleToggleRead}
              id={id}
              title={title}
              author={author}
              year={year}
              read={read}
            />
          );
        })}
      </SimpleGrid>
      <Box mb="4">
        <Button onClick={onCreateBookOpen}>Add book</Button>
      </Box>
    </Box>
  );
}

export default App;
