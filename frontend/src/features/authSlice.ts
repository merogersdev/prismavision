import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import server from '../axios/server';

// Fetch user details from Local Storage, else return null value - Makes TypeScript happy.
const getUser = () => {
  const userDetails = localStorage.getItem('user');
  if (userDetails == null) return null;
  return JSON.parse(userDetails);
};

type InitialStateProps = {
  user: object | null;
  isError: boolean;
  isRegisterSuccess: boolean;
  isLoginSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
};

const initialState: InitialStateProps = {
  user: getUser(),
  isError: false,
  isRegisterSuccess: false,
  isLoginSuccess: false,
  isLoading: false,
  message: '',
};

type Error = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};

type Data = {
  data: {
    user: User | null;
    isError: boolean;
    isRegisterSuccess: boolean;
    isLoginSuccess: boolean;
    isLoading: boolean;
    message: string | unknown;
  };
};

type User = {
  name: string;
  email: string;
  token: string;
  images: [];
};

type Logout = {
  fulfilled: boolean;
};

const errorHandler = (error: Error) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response: Data = await server.post('/api/users/', userData);

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(errorHandler(error.message));
    }
  }
);

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await server.post('/api/users/login', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(errorHandler(error.message));
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isRegisterSuccess = false;
      state.isLoginSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegisterSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoginSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
