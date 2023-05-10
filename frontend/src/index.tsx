import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import Feed from './pages/feed/feed';
import Profile from './pages/profile/profile';
import Messages from './pages/messages/messages';
import Friends from './pages/friends/friends';
import Login from './pages/login/login';
import PrivateRoute from './components/private-route/private-route';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { checkLogin } from './store/auth/thunks';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile/:id',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/messages',
        element: (
          <PrivateRoute>
            <Messages />
          </PrivateRoute>
        ),
      },
      {
        path: '/friends',
        element: (
          <PrivateRoute>
            <Friends />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <Login /> },
]);

store.dispatch(checkLogin());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
