import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { IUser } from '../hooks/UserContext';
import { auth } from './config';
import { createUserDoc } from './firestore';

export const createAccount = async (mail: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      mail,
      password
    );
    createUserDoc(userCredential.user.uid);
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

export const authObserver = (callback: Function, initialUser: IUser) => {
  onAuthStateChanged(auth, user => {
    if (user) {
      localStorage.setItem('auth', 'true');

      callback((prevState: IUser) => ({
        ...prevState,
        loggedIn: true,
        mail: user.email,
        fireId: user.uid,
      }));
    } else {
      localStorage.removeItem('auth');
      localStorage.removeItem('spot');

      callback(initialUser);
    }
  });
};
