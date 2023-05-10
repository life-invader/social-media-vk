import { createSlice } from '@reduxjs/toolkit';
import { checkLogin } from '../auth/thunks';
import { createPost, getFeed, getPosts, getProfile } from './thunks';

const initialState = {
  user: {
    _id: '',
    firstName: '',
    secondName: '',
    email: '',
    avatar: '',
    friends: [],
  },
  viewingProfile: {
    _id: '',
    firstName: '',
    secondName: '',
    email: '',
    avatar: '',
    friends: [],
  },
  posts: [] as any[],
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
