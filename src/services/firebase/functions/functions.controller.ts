import { functions } from '../config';
import { httpsCallable } from 'firebase/functions';

export const getToken = httpsCallable(functions, 'getToken');
export const refreshToken = httpsCallable(functions, 'refreshToken');
