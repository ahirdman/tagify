import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './config';

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
    callback();
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};
