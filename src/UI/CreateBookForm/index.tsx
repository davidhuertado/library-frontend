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
import { useDispatch } from 'react-redux';
import { createBook } from '../../reducers/bookReducer';
import { useAppDispatch } from '../../hooks';

interface CreateUserFormProps {
  onCloseFunc: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setNotification: React.Dispatch<React.SetStateAction<string>>;
  user: { token: string; username: string; id: string };
  books: any[];
  setBooks: React.Dispatch<React.SetStateAction<any[]>>;
}

const CreateBookForm = ({
  onCloseFunc,
  setError,
  setNotification,
  user,
  books,
  setBooks,
}: CreateUserFormProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [read, setRead] = useState(false);

  const dispatch = useAppDispatch();
  const handleCreateBookSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      // const newBook = await bookService.create({
      //   title: title,
      //   author: author ? author : 'N/S',
      //   year: year ? year : 'N/S',
      //   read: read,
      //   user: user.id,
      // });

      // setBooks([...books, newBook]);
      dispatch(
        createBook(
          {
            title: title,
            author: author ? author : 'N/S',
            year: year ? year : 'N/S',
            read: read,
            user: user.id,
          },
          user
        )
      );

      setTitle('');
      setAuthor('');
      setYear('');
      setRead(false);
      onCloseFunc();
      setNotification(`new book created`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    } catch (err: any) {
      setError(err.response.data.error);
      console.error(err.response.data.error);
      onCloseFunc();
      setTimeout(() => {
        setError('');
      }, 5000);
    }
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
