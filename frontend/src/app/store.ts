import authReducer from '../features/authSlice';
import { configureStore } from '@reduxjs/toolkit';

//TODO createListenerMiddleware for localStorage parsing

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
