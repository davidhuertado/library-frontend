import React, { useState, useEffect } from 'react';
import { Button, useDisclosure, Box, SimpleGrid } from '@chakra-ui/react';
import LoginForm from './UI/LoginForm';
import Notification from './UI/Notification';
import BookCard from './UI/BookCard';
import ModalForm from './UI/ModalForm';
import CreateUserForm from './UI/CreateUserForm';
import CreateBookForm from './UI/CreateBookForm';
import Header from './UI/Header';

import loginServices from './services/login.service';
import booksServices from './services/book.service';

import backgroundSpace from './assets/images/vincentiu-solomon-ln5drpv_ImI-unsplash.jpg';
import './App.css';
import bookService from './services/book.service';

export interface User {
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
    const loggedUserJSON = window.localStorage.getItem('loggedLibraryUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);

      bookService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await booksServices.getAll();
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
      } catch (err: any) {
        if (err.response.data.error === 'token expired') {
          setUser(null);
          window.localStorage.clear();
        }
      }
    };

    if (user) fetchBooks();
  }, [user]);

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

  const handleDeleteBook = async (id: string, name: string) => {
    try {
      let copyBooks = books;
      const newBooks = copyBooks.filter((book) => book.id !== id);
      setBooks(newBooks);

      setBooks(newBooks);
      setNotification(`Deleted ${name} book`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    } catch (error) {
      console.error('Error deleting books');
      setError('Error deleting book');
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
        minHeight="100vh"
        backgroundImage={backgroundSpace}
        backgroundSize="100%"
      >
        <Header
          title="My library"
          rightSlot={
            <Box>
              <Button variant="secondary" onClick={onCreateUserOpen}>
                Create user
              </Button>
            </Box>
          }
        />

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
          <Box m="3" width="50%" display="flex" justifyContent="center">
            <Notification status="success" message={notification} />
          </Box>
        ) : null}
        {error ? (
          <Box m="3" width="50%" display="flex" justifyContent="center">
            <Notification status="error" message={error} />
          </Box>
        ) : null}
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleLogin}
        />
        <Box mb="4"></Box>
      </Box>
    );
  }

  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
      backgroundImage={backgroundSpace}
      backgroundSize="100%"
      backgroundRepeat="repeat"
    >
      <Header
        title={`${user.username}'s library`}
        rightSlot={
          <Box m="0 0 0 auto">
            <Button variant="primary" onClick={onCreateBookOpen}>
              Add book
            </Button>
            <Button variant="secondary" ml="5" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        }
      />

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
      {notification ? (
        <Box m="3" width="50%" display="flex" justifyContent="center">
          <Notification status="success" message={notification} />
        </Box>
      ) : null}
      {error ? (
        <Box m="3" width="50%" display="flex" justifyContent="center">
          <Notification status="error" message={error} />
        </Box>
      ) : null}
      <SimpleGrid
        w="100%"
        spacing="30px"
        p="20"
        columns={{ sm: 1, md: 2, xl: 4 }}
        id="booksGrid"
      >
        {books.map(({ title, author, year, read, id }) => {
          return (
            <BookCard
              handleToggleRead={handleToggleRead}
              handleDeleteBook={handleDeleteBook}
              id={id}
              title={title}
              author={author}
              year={year}
              read={read}
            />
          );
        })}
      </SimpleGrid>
      <Box mb="4"></Box>
    </Box>
  );
}

export default App;
