import React, { useState, useEffect } from 'react';
import { Button, useDisclosure, Box, SimpleGrid } from '@chakra-ui/react';
import LoginForm from './UI/LoginForm';
import Notification from './UI/Notification';
import BookCard from './UI/BookCard';
import ModalForm from './UI/ModalForm';
import CreateUserForm from './UI/CreateUserForm';
import CreateBookForm from './UI/CreateBookForm';
import Header from './UI/Header';
import backgroundSpace from './assets/images/vincentiu-solomon-ln5drpv_ImI-unsplash.jpg';
import './App.css';
import bookService from './services/book.service';

import {
  initializeBooks,
  changeRead,
  deleteEntry,
} from './reducers/bookReducer';
import {
  setUserIdleStatus,
  unsetUser,
  setUser,
  logUserAsync,
} from './reducers/userReducer';
import {
  setNotification,
  setError,
  clearNotification,
} from './reducers/notificationReducer';

import { bookWithIdInterface } from './interfaces/book';

import { userInterface } from './interfaces/user';

import { useAppDispatch, useAppSelector } from './hooks';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useState<userInterface | null>(null);

  // Redux
  const dispatch = useAppDispatch();
  const booksRedux = useAppSelector((state) => state.books);
  const user = useAppSelector((state) => state.user.user);
  const userError = useAppSelector((state) => state.user.error);
  console.log(userError);
  const notification = useAppSelector((state) => state.notification);

  let filteredBooks: bookWithIdInterface[];

  if (booksRedux && user) {
    filteredBooks = booksRedux.filter(
      (book: bookWithIdInterface) => book.user.id === user!.id
    );
  }

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
      dispatch(setUser(user));
      bookService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    try {
      dispatch(initializeBooks());
    } catch (err: any) {
      if (err.response.data.error === 'token expired') {
        setUser(null);
        window.localStorage.clear();
      }
      // if (user) fetchBooks();
    }
  }, [user, dispatch]);

  const handleToggleRead = async (id: string) => {
    const book = filteredBooks!.find((book) => book.id === id);

    const modifiedBook = { ...book, read: !book!.read };
    try {
      dispatch(changeRead(id, modifiedBook));
    } catch (err) {
      dispatch(setError('Error put method'));
      setTimeout(() => {
        dispatch(setError(''));
      }, 5000);
    }
  };

  const handleDeleteBook = async (id: string, name: string) => {
    try {
      dispatch(deleteEntry(id, name));
      dispatch(setNotification(`Deleted ${name} book`));
      setTimeout(() => {
        dispatch(clearNotification(null));
      }, 5000);
    } catch (error) {
      console.error('Error deleting books');
      dispatch(setError('Error deleting book'));
      setTimeout(() => {
        dispatch(clearNotification(null));
      }, 5000);
    }
  };

  const handleLogout = () => {
    dispatch(unsetUser(null));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logUserAsync({ username, password }));
    // dispatch(setNotification(`${username} logged in`));
    // setTimeout(() => {
    //   dispatch(clearNotification(null));
    // }, 5000);
    setUsername('');
    setPassword('');
    setTimeout(() => {
      dispatch(setUserIdleStatus(null));
    }, 5000);
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
        backgroundSize={{ lg: '100%' }}
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
        {notification.message ? (
          <Box m="3" width="50%" display="flex" justifyContent="center">
            <Notification status="success" message={notification.message} />
          </Box>
        ) : null}
        {userError ? (
          <Box m="3" width="50%" display="flex" justifyContent="center">
            <Notification status="error" message={userError} />
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
            <Button
              mb={{ base: '10px', sm: ' 0' }}
              width="105px"
              variant="primary"
              onClick={onCreateBookOpen}
            >
              Add book
            </Button>
            <Button
              variant="secondary"
              width="105px"
              ml={{ sm: '5' }}
              onClick={handleLogout}
            >
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
          <CreateBookForm onCloseFunc={onCreateBookClose} user={user} />
        }
      />
      {notification ? (
        <Box m="3" width="50%" display="flex" justifyContent="center">
          <Notification status="success" message={notification.message} />
        </Box>
      ) : null}
      {notification.error ? (
        <Box m="3" width="50%" display="flex" justifyContent="center">
          <Notification status="error" message={notification.message} />
        </Box>
      ) : null}
      <SimpleGrid
        w="100%"
        spacing="30px"
        p="20"
        columns={{ sm: 1, md: 2, xl: 4 }}
        id="booksGrid"
      >
        {filteredBooks.map(({ title, author, year, read, id }) => {
          return (
            <BookCard
              handleToggleRead={handleToggleRead}
              handleDeleteBook={handleDeleteBook}
              id={id}
              title={title}
              author={author}
              year={year}
              read={read}
              key={id}
            />
          );
        })}
      </SimpleGrid>
      <Box mb="4"></Box>
    </Box>
  );
}

export default App;
