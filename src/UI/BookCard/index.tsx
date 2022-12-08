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
} from '@chakra-ui/react';

interface BookCardProps {
  title: string;
  author: string;
  year: string;
  read: boolean;
  id: string;
  handleToggleRead: (id: string) => void;
}

const BookCard = ({
  title,
  author,
  year,
  read,
  id,
  handleToggleRead,
}: BookCardProps): JSX.Element => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <UnorderedList>
          {author && <ListItem>{author}</ListItem>}
          {year && <ListItem>{year}</ListItem>}
          {read ? (
            <Badge colorScheme="green">Read</Badge>
          ) : (
            <Badge colorScheme="purple">Unread</Badge>
          )}
        </UnorderedList>
      </CardBody>
      <CardFooter>
        <Button onClick={() => handleToggleRead(id)}>
          Mark as 'unread/read'
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
