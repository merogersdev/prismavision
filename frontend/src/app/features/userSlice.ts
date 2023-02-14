import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import server from "../../axios/server";

export interface Image {
  id: number;
  description: string;
  percentage: number;
  created_at: Date;
  user_id: number;
}

export interface User {
  id: number;
  email: string;
  password: string;
  images: Image[];
}

interface InitialStateProps {
  user: object | null;
  isError: boolean;
  isRegisterSuccess: boolean;
  isLoginSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
}

const initialState: InitialStateProps = {
  user: {},
  isError: false,
  isRegisterSuccess: false,
  isLoginSuccess: false,
  isLoading: false,
  message: "",
};

export const GetLoginUser = createAsyncThunk(
  "user/login",
  async (email: string, password: string, thunkAPI) => {
    const res = await server.post("/users/login", {
      email,
      password,
    });
    return res.data;
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetLoginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
