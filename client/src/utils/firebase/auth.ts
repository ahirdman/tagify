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
    // less than 6 char = "auth/weak-password"
    // email already exists = "auth/email-already-in-use"
    // invalid email = "auth/invalid-email"

    const message = errorMessage(error.code);

    callback({
      display: true,
      message,
    });
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
