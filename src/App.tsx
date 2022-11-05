import * as React from 'react';
import './App.scss';
import { Navbar } from './Components/organisms';
import { Login, Tracks, Lists, Account, Home, ErrorPage } from './Pages';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './services/firebase/config';
import { firebaseSignIn, firebaseSignOut } from './store/user/user.slice';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {
  const ready = useAppSelector(state => state.user.ready);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, fireUser => {
      if (fireUser) {
        const { email, uid } = fireUser;
        dispatch(firebaseSignIn({ mail: email, fireId: uid }));
      } else {
        dispatch(firebaseSignOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      errorElement: <ErrorPage />,
      // loader: rootLoader,
      children: [
        {
          index: true,
          element: <Home />,
          // loader: teamLoader,
        },
        {
          path: '/tracks',
          element: <Tracks />,
        },
        {
          path: '/lists',
          element: <Lists />,
        },
        {
          path: '/account',
          element: <Account />,
        },
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
  ]);

  // if (ready) {
  //   return (
  //     <main className="app">
  //       <Navbar />
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/tracks" element={<Tracks />} />
  //         <Route path="/lists" element={<Lists />} />
  //         <Route path="/account" element={<Account />} />
  //       </Routes>
  //     </main>
  //   );
  // } else if (true) {
  //   return <Login />;
  // } else {

  return <RouterProvider router={router} />;
};

export default App;
