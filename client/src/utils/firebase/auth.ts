import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { IUser } from '../hooks/UserContext';
import { auth } from './config';
import { createUserDoc } from './firestore';

const errorMessage = (code: string) => {
  if (code === 'auth/weak-password') {
    return 'Password must be longer them 6 characters';
  }

  if (code === 'auth/email-already-in-use') {
    return 'Email is already in use';
  }

  if (code === 'auth/invalid-email') {
    return 'Invalid email';
  }

  if (code === 'auth/wrong-password') {
    return 'Wrong password';
  }

  if (code === 'auth/user-not-found') {
    return 'No account linked to email address';
  }

  return code;
};

export const createAccount = async (
  mail: string,
  password: string,
  callback: Function
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      mail,
      password
    );
    createUserDoc(userCredential.user.uid);
  } catch (error) {
    const message = errorMessage(error.code);

    callback({
      display: true,
      message,
    });
  }
};

export const logInEmailPassword = async (
  mail: string,
  password: string,
  callback: Function
) => {
  try {
    await signInWithEmailAndPassword(auth, mail, password);
  } catch (error) {
    const message = errorMessage(error.code);

    callback({
      display: true,
      message,
    });
  }
};

export const logOut = async () => {
  await signOut(auth);
};

export const authObserver = (setUser: Function, emptyUserObj: IUser) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      localStorage.setItem('auth', 'true');

      setUser((prevState: IUser) => ({
        ...prevState,
        loggedIn: true,
        mail: user.email,
        fireId: user.uid,
      }));
    } else {
      localStorage.removeItem('auth');
      localStorage.removeItem('spot');

      setUser(emptyUserObj);
    }
  });
};
