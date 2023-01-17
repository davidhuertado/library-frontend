import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducer';
import userReducer from './reducers/userReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    books: bookReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
