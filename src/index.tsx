import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/_base.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Account, ErrorPage, Home, Lists, Tracks } from './Pages';
import App from './App';
import { EditList, SelectedTrack } from './Pages';

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
        element: <Home />,
      },
      {
        path: '/tracks',
        element: <Tracks />,
      },
      {
        path: '/tracks/:trackId',
        element: <SelectedTrack />,
      },
      {
        path: '/lists',
        element: <Lists />,
      },
      {
        path: '/lists/:listId',
        element: <EditList />,
      },
      {
        path: '/account',
        element: <Account />,
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
