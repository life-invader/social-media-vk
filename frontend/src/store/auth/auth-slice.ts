import { createSlice } from '@reduxjs/toolkit';
import { checkLogin, login, registerUser } from './thunks';

const initialState = {
  status: 'init',
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 'init';
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    // Логин
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(login.fulfilled, (state) => {
      state.status = 'success';
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.status = 'error';
      state.isLoggedIn = false;
    });

    // Регистрация registerUser
    builder.addCase(registerUser.fulfilled, (state) => {
      state.status = 'success';
      state.isLoggedIn = true;
    });

    // Получения пользователя
    builder.addCase(checkLogin.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(checkLogin.fulfilled, (state) => {
      state.status = 'success';
      state.isLoggedIn = true;
    });
    builder.addCase(checkLogin.rejected, (state) => {
      state.status = 'error';
      state.isLoggedIn = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
