import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../util/axiosInstance';

type User = {
  email: string;
  token: string;
  images: [];
};

type initialState = {
  loading: boolean;
  user: object;
  error: string;
};

const initialState: initialState = {
  loading: false,
  user: {},
  error: '',
};

export const userLogin = createAsyncThunk(
  'user/login',
  async (userData, _thunkAPI) => {
    const response = await axiosInstance.post('/api/users/login', userData);
    return response.data;
  }
);

export const userSignup = createAsyncThunk(
  'user/signup',
  async (userData, _thunkAPI) => {
    const response = await axiosInstance.post('/api/users', userData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
          state.error = '';
        }
      );
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(userSignup.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(
        userSignup.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
          state.error = '';
        }
      );
    builder.addCase(userSignup.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default userSlice.reducer;
