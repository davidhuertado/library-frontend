import React from 'react';
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
  title: string;
  author: string;
  year: string;
  read: boolean;
  id: string;
  handleToggleRead: (id: string) => void;
  handleDeleteBook: (id: string, name: string) => void;
}

const BookCard = ({
  title,
  author,
  year,
  read,
  id,
  handleToggleRead,
  handleDeleteBook,
}: BookCardProps): JSX.Element => {
  return (
    <Card
      className="bookcard"
      textAlign="left"
      backgroundColor="#fff"
      maxWidth="350px"
    >
      <CardHeader display="flex">
        <Heading size="lg">{title}</Heading>
        <CloseButton
          m="0 0 0 auto"
          onClick={() => handleDeleteBook(id, title)}
        />
      </CardHeader>
      <CardBody>
        <UnorderedList listStyleType="none">
          {author && (
            <ListItem>
              <Text fontSize="lg" fontWeight="bold">
                Author: {author}
              </Text>
            </ListItem>
          )}
          {year && (
            <ListItem>
              <Text fontWeight="bold">Year: {year}</Text>
            </ListItem>
          )}
          {read ? (
            <Badge colorScheme="purple" variant="solid">
              Read
            </Badge>
          ) : (
            <Badge colorScheme="purple">Unread</Badge>
          )}
        </UnorderedList>
      </CardBody>
      <CardFooter display="flex" justifyContent="center">
        <Button variant="secondary" onClick={() => handleToggleRead(id)}>
          Mark as 'unread/read'
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
