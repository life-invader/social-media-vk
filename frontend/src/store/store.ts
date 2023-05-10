import { configureStore } from '@reduxjs/toolkit';
import { axiosApi } from '../api/api';
import authSlice from './auth/auth-slice';
import userSlice from './user/user-slice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axiosApi,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch