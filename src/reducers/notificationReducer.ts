import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login.service';
import bookService from '../services/book.service';

const initialState: any = {
  message: '',
  error: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload,
        error: false,
      };
    },
    setError(state, action) {
      return {
        message: action.payload,
        error: true,
      };
    },
    clearNotification(state, action) {
      return {
        message: '',
        error: false,
      };
    },
  },
});

export const { setNotification, setError, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
