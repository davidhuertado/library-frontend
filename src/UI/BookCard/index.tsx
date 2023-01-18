import {
  toggleReadAsync,
  deleteBookAsync,
  cleanBooksStatus,
} from '../../reducers/bookReducer';
import { useAppDispatch } from '../../hooks';
import { bookWithIdInterface } from '../../interfaces/book';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  UnorderedList,
  ListItem,
  Badge,
  Text,
  CloseButton,
} from '@chakra-ui/react';

interface BookCardProps {
  book: bookWithIdInterface;
}

const BookCard = ({ book }: BookCardProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleToggleRead = async (id: string) => {
    const modifiedBook = { ...book, read: !book.read };
    dispatch(toggleReadAsync({ id, modifiedBook }));
    setTimeout(() => {
      dispatch(cleanBooksStatus(null));
    }, 5000);
  };
  const handleDeleteBook = async (id: string) => {
    dispatch(deleteBookAsync(id));
    setTimeout(() => {
      dispatch(cleanBooksStatus(null));
    }, 5000);
  };
  return (
    <Card
      className="bookcard"
      textAlign="left"
      backgroundColor="#fff"
      maxWidth="350px"
    >
      <CardHeader display="flex">
        <Heading size="lg">{book.title}</Heading>
        <CloseButton m="0 0 0 auto" onClick={() => handleDeleteBook(book.id)} />
      </CardHeader>
      <CardBody>
        <UnorderedList listStyleType="none">
          {book.author && (
            <ListItem>
              <Text fontSize="lg" fontWeight="bold">
                Author: {book.author}
              </Text>
            </ListItem>
          )}
          {book.year && (
            <ListItem>
              <Text fontWeight="bold">Year: {book.year}</Text>
            </ListItem>
          )}
          {book.read ? (
            <Badge colorScheme="purple" variant="solid">
              Read
            </Badge>
          ) : (
            <Badge colorScheme="purple">Unread</Badge>
          )}
        </UnorderedList>
      </CardBody>
      <CardFooter display="flex" justifyContent="center">
        <Button variant="secondary" onClick={() => handleToggleRead(book.id)}>
          Mark as 'unread/read'
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
