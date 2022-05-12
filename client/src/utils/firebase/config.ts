import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_15mc0jLh5i8c5AWX237B0LYOmekMycU',
  authDomain: 'moodify-92f8f.firebaseapp.com',
  projectId: 'moodify-92f8f',
  storageBucket: 'moodify-92f8f.appspot.com',
  messagingSenderId: '940861327514',
  appId: '1:940861327514:web:19e178deb96e7644a23723',
  measurementId: 'G-24CJWGP9J5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
