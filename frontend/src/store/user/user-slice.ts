import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { checkLogin, login, registerUser } from '../auth/thunks';
import { createPost, getFeed, getPosts, getProfile } from './thunks';
import type { IUserSlice } from '../types';
import type { IUser } from '../../types/user';
import type { IPost } from '../../types/post';

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
    builder.addCase(checkLogin.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    });
    builder.addCase(login.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
      state.viewingProfile = payload;
    });
    // Получение постов
    builder.addCase(getPosts.fulfilled, (state, { payload }: PayloadAction<IPost[]>) => {
      state.posts = payload;
    });
    builder.addCase(getFeed.fulfilled, (state, { payload }: PayloadAction<IPost[]>) => {
      state.feed = payload;
    });
    builder.addCase(createPost.fulfilled, (state, { payload }: PayloadAction<IPost>) => {
      state.posts.unshift(payload);
    });
  },
});

export default userSlice.reducer;
