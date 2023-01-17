import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userInterface } from '../interfaces/user';
import loginService from '../services/login.service';
import bookService from '../services/book.service';
import userService from '../services/user.service';

const initialState: any = {
  user: null,
  status: 'idle',
  error: '',
};

export const logUserAsync = createAsyncThunk(
  'user/logUserAsyncStatus',
  async (credentials: any) => {
    const user = await loginService.login(credentials);
    return user;
  }
);

export const createUserAsync = createAsyncThunk(
  'user/createUserThunk',
  async (userData: { username: string; password: string }) => {
    const newUser: {
      username: string;
      passwordHash: string;
      books: {}[];
    } = await userService.create(userData);
    return newUser;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      window.localStorage.setItem(
        'loggedLibraryUser',
        JSON.stringify(action.payload)
      );
      bookService.setToken(action.payload.token);

      state.user = action.payload;
    },
    unsetUser(state, action) {
      window.localStorage.clear();
      state.user = null;
    },
    setUserIdleStatus(state, action) {
      state.error = '';
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUserAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(logUserAsync.fulfilled, (state, action) => {
        window.localStorage.setItem(
          'loggedLibraryUser',
          JSON.stringify(action.payload)
        );
        bookService.setToken(action.payload.token);
        state.status = 'succeeded';
        state.user = action.payload;
      })

      .addCase(logUserAsync.rejected, (state, action) => {
        console.log(action.payload);
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logUserAsync.pending, (state, action) => {
        state.status = 'loading';
      });
  },
});

export const { setUser, unsetUser, setUserIdleStatus } = userSlice.actions;

export default userSlice.reducer;

// export const logUser = (credentials: any) => {
//   return async (dispatch: any) => {
//     const user = await loginService.login(credentials);
//     console.log(user);
//     dispatch(setUser(user));
//   };
// };
