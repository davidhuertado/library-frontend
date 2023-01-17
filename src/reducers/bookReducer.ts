import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  bookWithIdInterface,
  bookWithoutIdInterface,
} from '../interfaces/book';
import bookService from '../services/book.service';

const initialState: bookWithIdInterface[] = [];

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBooks(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    appendBook(state, action) {
      state.push(action.payload);
    },
    toggleRead(state, action) {
      const changedBook = action.payload;
      console.log(changedBook);
      return state.map((book) =>
        book.id === changedBook.id ? changedBook : book
      );
    },
    deleteBook(state, action: PayloadAction<string>) {
      return state.filter((book) => book.id !== action.payload);
    },
  },
});

export const { setBooks, appendBook, toggleRead, deleteBook } =
  bookSlice.actions;

export default bookSlice.reducer;

export const initializeBooks = () => {
  return async (dispatch: any) => {
    const books = await bookService.getAll();

    dispatch(setBooks(books));
  };
};

export const createBook = (content: bookWithoutIdInterface, user: any) => {
  return async (dispatch: any) => {
    const book = await bookService.create(content);
    dispatch(appendBook(content, user));
  };
};

export const changeRead = (id: string, book: bookWithIdInterface) => {
  return async (dispatch: any) => {
    const changedBook = await bookService.toggleRead(id, book);

    dispatch(toggleRead({ ...book, read: !book.read }));
  };
};

export const deleteEntry = (id: string, name: string) => {
  return async (dispatch: any) => {
    await bookService.deleteBook(id);
    dispatch(deleteBook(id));
  };
};
