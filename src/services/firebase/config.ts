import { initializeApp, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASURMENT_ID,
};

const app = initializeApp(firebaseConfig);

const functions = getFunctions(getApp());

if (window.location.hostname === 'localhost') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export { functions };

export const db = getFirestore(app);
export const auth = getAuth(app);
