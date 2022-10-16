import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import './App.scss';
import Navbar from './Components/organisms/Navbar/Navbar';
import { Login, Tracks, Lists, Account } from './Pages';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './services/firebase/config';
import { firebaseSignIn, firebaseSignOut } from './store/user/user.slice';
import Home from './Pages/home/Home';

const App = () => {
  const ready = useAppSelector(state => state.user.ready);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, fireUser => {
      if (fireUser) {
        console.log('signed in as:', fireUser.email);
        const { email, uid } = fireUser;
        dispatch(firebaseSignIn({ mail: email, fireId: uid }));
      } else {
        dispatch(firebaseSignOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (ready) {
    return (
      <main className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    );
  } else {
    return <Login />;
  }
};

export default App;
