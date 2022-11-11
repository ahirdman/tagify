import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/_base.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Settings,
  Dashboard,
  EditList,
  EditTrack,
  ErrorPage,
  SelectList,
  SelectTrack,
} from './Pages';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <Dashboard />,
      },
      {
        path: '/tracks',
        element: <SelectTrack />,
      },
      {
        path: '/tracks/:trackId',
        element: <EditTrack />,
      },
      {
        path: '/lists',
        element: <SelectList />,
      },
      {
        path: '/lists/:listId',
        element: <EditList />,
      },
      {
        path: '/account',
        element: <Settings />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
