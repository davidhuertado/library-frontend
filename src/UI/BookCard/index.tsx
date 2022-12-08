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
} from '@chakra-ui/react';

interface BookCardProps {
  title: string;
  author: string;
  year: string;
  read: boolean;
}

const BookCard = ({
  title,
  author,
  year,
  read,
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
          {read ? <ListItem>Read</ListItem> : <ListItem>Unread</ListItem>}
        </UnorderedList>
      </CardBody>
      <CardFooter>
        <Button>Vi</Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
