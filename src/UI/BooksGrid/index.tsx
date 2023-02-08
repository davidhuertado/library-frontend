import { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchBooksAsync } from '../../reducers/bookReducer';
import { bookWithIdInterface } from '../../interfaces/book';
import BookCard from '../BookCard';

const BooksGrid = () => {
  const dispatch = useAppDispatch();
  const fetchedBooks = useAppSelector((state) => state.books.books);
  const user = useAppSelector((state) => state.user.user);
  console.log(fetchedBooks);

  let filteredBooks: bookWithIdInterface[] = [];

  if (fetchedBooks && user) {
    filteredBooks = fetchedBooks.filter(
      (book: bookWithIdInterface) => book.user._id === user!.id
    );
  }

  useEffect(() => {
    dispatch(fetchBooksAsync());
  }, [dispatch]);

  console.log(filteredBooks);
  return (
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
  );
};

export default BooksGrid;
