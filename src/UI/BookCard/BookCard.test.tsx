import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookCard from './';

describe('<BookCard />', () => {
  let container;
  const book = {
    title: 'testing with jest',
    author: 'David',
    year: '2022',
    read: true,
    id: '1',
    user: 'testUser',
  };
  const mockDeleteHandler = jest.fn();
  const mockToggleHandler = jest.fn();

  beforeEach(() => {
    container = render(<BookCard book={book} />).container;
  });

  test('render card', () => {
    const element = screen.getByText('testing with jest');
    expect(element).toBeDefined();
  });

  test('test handlers', async () => {
    const user = userEvent.setup();
    const readButton = screen.getByText(`Mark as 'unread/read'`);
    const closeButton = screen.getByLabelText('Close');
    await user.click(readButton);
    await user.click(closeButton);
    expect(mockToggleHandler.mock.calls).toHaveLength(1);
    expect(mockDeleteHandler.mock.calls).toHaveLength(1);
  });

  test('toggle read', async () => {
    const user = userEvent.setup();
    const readButton = screen.getByText(`Mark as 'unread/read'`);
  });
});
