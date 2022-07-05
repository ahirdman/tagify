import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './config';

export const createAccount = async (mail: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      mail,
      password
    );
    console.log(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logInEmailPassword = async (mail: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      mail,
      password
    );
    console.log(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.log(error);
    return error;
  }
};
