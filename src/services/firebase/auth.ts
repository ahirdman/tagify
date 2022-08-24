import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
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
