import { createSlice } from '@reduxjs/toolkit';
import { checkLogin, login, registerUser } from '../auth/thunks';
import { createPost, getFeed, getPosts, getProfile } from './thunks';
import type { IUserSlice } from '../types';

const initialState: IUserSlice = {
  user: null,
  viewingProfile: null,
  posts: [],
  feed: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получения меня
    builder.addCase(checkLogin.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.viewingProfile = payload;
    });
    // Получение постов
    builder.addCase(getPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
    });
    builder.addCase(getFeed.fulfilled, (state, { payload }) => {
      state.feed = payload;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }: any) => {
      state.posts.unshift(payload);
    });
  },
});

export default userSlice.reducer;
