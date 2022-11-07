import * as React from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './services/firebase/config';
import { firebaseSignIn, firebaseSignOut } from './store/user/user.slice';
import { useNavigate } from 'react-router-dom';
import { Login } from './Pages';
import RootLayout from './Layout/RootLayout/RootLayout';

const App = () => {
  const ready = useAppSelector(state => state.user.ready);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, fireUser => {
      if (fireUser) {
        const { email, uid } = fireUser;
        dispatch(firebaseSignIn({ mail: email, fireId: uid }));
        navigate('/home');
      } else {
        dispatch(firebaseSignOut());
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (ready) {
    return <RootLayout />;
  } else {
    return <Login />;
  }
};

export default App;
