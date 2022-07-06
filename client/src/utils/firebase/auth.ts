import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { IUser, userObject } from '../hooks/UserContext';
import { auth } from './config';

export const createAccount = async (mail: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, mail, password);
  } catch (error) {
    console.log(error);
  }
};

export const logInEmailPassword = async (mail: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, mail, password);
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  await signOut(auth);
};

export const authObserver = (callback: Function) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      localStorage.setItem('auth', 'true');

      callback((prevState: IUser) => ({
        ...prevState,
        loggedIn: true,
        mail: user.email,
      }));
    } else {
      localStorage.clear();

      callback(userObject);
    }
  });
};
