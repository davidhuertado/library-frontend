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

import { fetchBooksAsync, deleteEntry } from './reducers/bookReducer';
import { unsetUser, setUser } from './reducers/userReducer';
import {
  setNotification,
  setError,
  clearNotification,
} from './reducers/notificationReducer';

import { bookWithIdInterface } from './interfaces/book';

import { useAppDispatch, useAppSelector } from './hooks';

function App() {
  // Redux
  const dispatch = useAppDispatch();
  const booksRedux = useAppSelector((state) => state.books.books);
  const user = useAppSelector((state) => state.user.user);
  console.log(booksRedux);

  let filteredBooks: bookWithIdInterface[] = [];

  if (booksRedux && user) {
    filteredBooks = booksRedux.filter(
      (book: bookWithIdInterface) => book.user.id === user!.id
    );
  }
  console.log(booksRedux);

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
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBooksAsync());
  }, []);

  const handleLogout = () => {
    dispatch(unsetUser(null));
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
          bodyContent={<CreateUserForm onCloseFunc={onCreateUserClose} />}
        />

        <Notification />
        <LoginForm />
      </Box>
    );
  }

  if (filteredBooks) {
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
        <Notification />
        <SimpleGrid
          w="100%"
          spacing="30px"
          p="20"
          columns={{ sm: 1, md: 2, xl: 4 }}
          id="booksGrid"
        >
          {filteredBooks.map((book) => {
            return <BookCard book={book} key={book.id} />;
          })}
        </SimpleGrid>
        <Box mb="4"></Box>
      </Box>
    );
  }
}

export default App;
