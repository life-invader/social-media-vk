import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';


export const login = createAsyncThunk('auth/login', async (userData: any, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.post('/auth/login', userData);

  return data;
});

export const checkLogin = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.get('/auth/login');

  return data;
});

export const registerUser = createAsyncThunk('auth/register', async (userData: any, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.post('/auth/register', userData);

  return data;
});