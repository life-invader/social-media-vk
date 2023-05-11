import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { IPost } from '../../types/post';
import type { IUser } from '../../types/user';


export const getPosts = createAsyncThunk('user/getPosts', async (id: number | string, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.get(`/posts/${id}`,);
  return data as IPost[];
});

export const getFeed = createAsyncThunk('user/getFeed', async (_, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.get('/posts/feed');
  return data as IPost[];
});

export const createPost = createAsyncThunk('user/createPosts', async (postData: FormData, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.post('/posts', postData);
  return data as IPost;
});

export const getProfile = createAsyncThunk('user/getProfile', async (id: number | string, thunkAPI) => {
  const axios = thunkAPI.extra as AxiosInstance;
  const { data } = await axios.get(`/profile/${id}`,);
  return data as IUser;
});
