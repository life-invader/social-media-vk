import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { ILoginData, IRegisterData } from '../../types/common';
import type { IUser } from '../../types/user';


export const login = createAsyncThunk('auth/login', async (userData: ILoginData, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.post('/auth/login', userData);

  return data as IUser;
});

export const checkLogin = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.get('/auth/login');

  return data as IUser;
});

export const registerUser = createAsyncThunk('auth/register', async (userData: IRegisterData, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.post('/auth/register', userData);

  return data as IUser;
});