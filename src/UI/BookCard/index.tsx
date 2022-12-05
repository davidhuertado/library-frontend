import React from 'react';

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
    <div>
      <ul>
        <li>{title}</li>
        <li>{author}</li>
        <li>{year}</li>
        <li>{read}</li>
      </ul>
    </div>
  );
};
