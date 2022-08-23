import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  collection,
  deleteDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { IDbTrack } from '../interface';
import db from './config';

export const tagDoc = (user: string, tag: string) =>
  doc(db, 'users', user, 'tags', tag);

export const tagCol = (user: string) => collection(db, `users/${user}/tags`);

export const createUserDoc = async (uid: string) => {
  await setDoc(doc(db, 'users', uid), {
    created: serverTimestamp(),
    spotifyAuth: false,
    spotifyRefreshToken: '',
  });
};

const addSeconds = (numOfSeconds: number, date = new Date()) => {
  date.setSeconds(date.getSeconds() + numOfSeconds);

  return date;
};
/**
 * Get a users document
 * @param uid
 * @returns An Object containing all fields in the document
 */

export const userDoc = async (uid: string) => {
  const userDoc = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDoc);

  if (userDocSnap.exists()) {
    console.log('Document data:', userDocSnap.data());
    const timestamp = new Date(
      userDocSnap.data().spotifyTokenTimestamp.seconds * 1000
    );

    const secondsToExperation = userDocSnap.data().spotifyExpires;

    const experationTime = addSeconds(secondsToExperation - 10, timestamp);

    console.log(experationTime <= new Date());

    return userDocSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
    return null;
  }
};

export const createTag = async (
  user: string,
  tag: string,
  color: string,
  track: IDbTrack
) => {
  await setDoc(
    doc(db, 'users', user, 'tags', tag),
    {
      name: tag,
      color: color,
      tracks: [track],
    },
    { merge: true }
  );
};

export const tagTrack = async (user: string, tag: string, track: IDbTrack) => {
  await updateDoc(doc(db, 'users', user, 'tags', tag), {
    tracks: arrayUnion(track),
  });
};

export const clearTrackFromTag = async (
  user: string,
  tag: string,
  track: IDbTrack
) => {
  await updateDoc(doc(db, 'users', user, 'tags', tag), {
    tracks: arrayRemove(track),
  });
};

export const deleteList = async (user: string, tag: string) => {
  await deleteDoc(tagDoc(user, tag));
};
