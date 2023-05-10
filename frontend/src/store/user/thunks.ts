import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';


export const getPosts = createAsyncThunk('user/getPosts', async (id: number | string, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.get(`/posts/${id}`,);
  return data;
});

export const getFeed = createAsyncThunk('user/getFeed', async (_, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.get('/posts/feed');
  return data;
});

export const createPost = createAsyncThunk('user/createPosts', async (postData: any, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.post('/posts', postData);
  return data;
});

export const getProfile = createAsyncThunk('user/getProfile', async (id: number | string, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.get(`/profile/${id}`,);
  return data;
});
