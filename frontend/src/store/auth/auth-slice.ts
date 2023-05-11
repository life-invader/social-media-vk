import { createSlice } from '@reduxjs/toolkit';
import { checkLogin, login, registerUser } from './thunks';
import { AuthStatus, IAuthSlice } from '../types';

const initialState: IAuthSlice = {
  status: AuthStatus.Init,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = AuthStatus.Init;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    // Логин
    builder.addCase(login.pending, (state) => {
      state.status = AuthStatus.Loading;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.status = AuthStatus.Success;
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.status = AuthStatus.Error;
      state.isLoggedIn = false;
    });

    // Регистрация registerUser
    builder.addCase(registerUser.fulfilled, (state) => {
      state.status = AuthStatus.Success;
      state.isLoggedIn = true;
    });

    // Проверка логина (при старте приложения)
    builder.addCase(checkLogin.pending, (state) => {
      state.status = AuthStatus.Loading;
    });
    builder.addCase(checkLogin.fulfilled, (state) => {
      state.status = AuthStatus.Success;
      state.isLoggedIn = true;
    });
    builder.addCase(checkLogin.rejected, (state) => {
      state.status = AuthStatus.Error;
      state.isLoggedIn = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
