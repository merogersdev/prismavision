import userReducer from '../features/user/userSlice';
import { configureStore } from '@reduxjs/toolkit';

//TODO createListenerMiddleware for localStorage parsing

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
