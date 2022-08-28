import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../config';
import { createUserDoc } from '../firestore/firestore.service';
import { errorMessage } from './auth.service';

export const createAccount = async (
  mail: string,
  password: string,
  errorCallback: Function
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

    errorCallback({
      display: true,
      message,
    });
  }
};

export const logInEmailPassword = async (
  mail: string,
  password: string,
  errorCallback: Function
) => {
  try {
    await signInWithEmailAndPassword(auth, mail, password);
  } catch (error) {
    const message = errorMessage(error.code);

    errorCallback({
      display: true,
      message,
    });
  }
};

export const logOut = async () => {
  await signOut(auth);
};
