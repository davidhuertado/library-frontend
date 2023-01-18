import React, { FormEvent, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Switch,
} from '@chakra-ui/react';
import Form from '../Form';
// import bookService from '../../services/book.service';

import {
  createBook,
  createBookAsync,
  cleanBooksStatus,
} from '../../reducers/bookReducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface CreateUserFormProps {
  onCloseFunc: () => void;

  user: { token: string; username: string; id: string };
}

const CreateBookForm = ({ onCloseFunc }: CreateUserFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [read, setRead] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const handleCreateBookSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createBookAsync({
        title: title,
        author: author ? author : 'N/S',
        year: year ? year : 'N/S',
        read: read,
        user: user!.id,
      })
    );
    setTitle('');
    setAuthor('');
    setYear('');
    setRead(false);
    onCloseFunc();
    setTimeout(() => {
      cleanBooksStatus(null);
    }, 5000);
  };

  const isErrorUser = author === '';

  return (
    <Form buttonText="Create" onSubmitFunc={handleCreateBookSubmit}>
      <Box mb="4">
        <FormControl isRequired isInvalid={isErrorUser}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="titleInput"
          />
          <FormErrorMessage>Title required</FormErrorMessage>
        </FormControl>
      </Box>
      <Box mb="4">
        <FormControl>
          <FormLabel>Author</FormLabel>
          <Input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            id="authorInput"
          />
        </FormControl>
      </Box>
      <Box mb="4">
        <FormControl>
          <FormLabel>Year</FormLabel>
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            id="yearInput"
          />
        </FormControl>
      </Box>
      <Box mb="4">
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Do you already read it?</FormLabel>
          <Switch
            id="isReadInput"
            size="md"
            checked={read}
            onChange={() => setRead(!read)}
          />
        </FormControl>
      </Box>
    </Form>
  );
};

export default CreateBookForm;
