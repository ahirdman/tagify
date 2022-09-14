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
import { db } from '../config';
import { IFirestoreTrack } from './firestore.interface';

/**
 * Firebase References
 */

const userDocRef = (uid: string) => doc(db, 'users', uid);
const userTagDocRef = (user: string, tag: string) =>
  doc(db, 'users', user, 'tags', tag);
const userTagCollectionRef = (user: string) =>
  collection(db, `users/${user}/tags`);

/**
 * Firebase Services
 */

export const tagDoc = (user: string, tag: string) => userTagDocRef(user, tag);

export const tagCol = (user: string) => userTagCollectionRef(user);

export const createUserDoc = async (uid: string) => {
  await setDoc(userDocRef(uid), {
    created: serverTimestamp(),
    spotifyAuth: false,
  });
};

export const getUserDocument = async (uid: string): Promise<any> => {
  const userDocSnap = await getDoc(userDocRef(uid));

  if (!userDocSnap.exists()) {
    // doc.data() will be undefined in this case
    console.log('No such document!');
    return null;
  }

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  }
};

export const createTag = async (
  user: string,
  tag: string,
  color: string,
  track: IFirestoreTrack
) => {
  await setDoc(
    userTagDocRef(user, tag),
    {
      name: tag,
      color: color,
      tracks: [track],
    },
    { merge: true }
  );
};

export const tagTrack = async (
  user: string,
  tag: string,
  track: IFirestoreTrack
) => {
  await updateDoc(userTagDocRef(user, tag), {
    tracks: arrayUnion(track),
  });
};

export const clearTrackFromTag = async (
  user: string,
  tag: string,
  track: IFirestoreTrack
) => {
  await updateDoc(userTagDocRef(user, tag), {
    tracks: arrayRemove(track),
  });
};

export const deleteList = async (user: string, tag: string) => {
  await deleteDoc(userTagDocRef(user, tag));
  // await deleteDoc(tagDoc(user, tag));
};
