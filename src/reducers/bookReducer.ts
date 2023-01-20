import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  bookWithIdInterface,
  bookWithoutIdInterface,
} from '../interfaces/book';
import bookService from '../services/book.service';

interface booksSliceInterface {
  books: bookWithIdInterface[];
  status: string;
  error: boolean;
  notification: string;
}

const initialState: booksSliceInterface = {
  books: [],
  status: 'idle',
  error: false,
  notification: '',
};

export const fetchBooksAsync = createAsyncThunk(
  'book/fetchBookAsyncStatus',
  async () => {
    const books = await bookService.getAll();
    console.log(books);
    return books;
  }
);
export const createBookAsync = createAsyncThunk(
  'book/createBookThunk',
  async (content: bookWithoutIdInterface) => {
    const book = await bookService.create(content);
    console.log(book);
    return book;
  }
);

export const deleteBookAsync = createAsyncThunk(
  'book/deleteBookAsync',
  async (id: string) => {
    await bookService.deleteBook(id);
    return id;
  }
);

export const toggleReadAsync = createAsyncThunk(
  'book/toggleReadThunk',
  async (parameters: { id: string; modifiedBook: bookWithIdInterface }) => {
    const modifiedResponseBook = await bookService.toggleRead(
      parameters.id,
      parameters.modifiedBook
    );

    return modifiedResponseBook;
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBooks(state, action) {
      return action.payload;
    },
    appendBook(state, action) {
      state.books.push(action.payload);
    },
    toggleRead(state, action) {
      const changedBook = action.payload;

      return state.books.map((book) =>
        book.id === changedBook.id ? changedBook : book
      );
    },
    deleteBook(state, action: PayloadAction<string>) {
      return state.books.filter((book) => book.id !== action.payload);
    },
    cleanBooksStatus(state, action) {
      state.status = 'idle';
      state.error = false;
      state.notification = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(deleteBookAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const idDeleted = action.payload;
        const filterDeleted = state.books.filter(
          (book: bookWithIdInterface) => book.id !== idDeleted
        );
        state.books = filterDeleted;
      })
      .addCase(deleteBookAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.notification = action.error.message!;
        state.error = true;
      })
      .addCase(deleteBookAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchBooksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.notification = action.error.message!;
        state.error = true;
      })
      .addCase(fetchBooksAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createBookAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books.push(action.payload);
        state.notification = `${action.payload.title}'s entry created`;
      })
      .addCase(createBookAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.notification = action.error.message!;
        state.error = true;
      })
      .addCase(createBookAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(toggleReadAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const changedBook = action.payload;
        console.log(changedBook);
        state.books = state.books.map((book: bookWithIdInterface) =>
          book.id !== changedBook.id ? book : changedBook
        );
      })
      .addCase(toggleReadAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.notification = action.error.message!;
        state.error = true;
      })
      .addCase(toggleReadAsync.pending, (state, action) => {
        state.status = 'loading';
      });
  },
});

export const {
  setBooks,
  appendBook,
  toggleRead,
  deleteBook,
  cleanBooksStatus,
} = bookSlice.actions;

export default bookSlice.reducer;

// export const initializeBooks = () => {
//   return async (dispatch: any) => {
//     const books = await bookService.getAll();

//     dispatch(setBooks(books));
//   };
// };

export const createBook = (content: bookWithoutIdInterface, user: any) => {
  return async (dispatch: any) => {
    const book = await bookService.create(content);
    dispatch(appendBook(content));
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
