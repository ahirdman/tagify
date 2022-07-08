import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  collection,
  // query,
  deleteDoc,
  // where,
  serverTimestamp,
} from 'firebase/firestore';
import { IDbTrack } from '../interface';
import db from './config';

const tagDoc = (user: string, tag: string) =>
  doc(db, 'users', user, 'tags', tag);

const tagCol = (user: string) => collection(db, `users/${user}/tags`);

// const q = (user: string, tag: string) =>
//   query(collection(db, 'users/purchasedAids/tags'), where('name', '==', tag));

const createUserDoc = async (uid: string) => {
  await setDoc(doc(db, 'users', uid), {
    created: serverTimestamp(),
  });
};

const createTag = async (
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

const tagTrack = async (user: string, tag: string, track: IDbTrack) => {
  await updateDoc(doc(db, 'users', user, 'tags', tag), {
    tracks: arrayUnion(track),
  });
};

const clearTrackFromTag = async (
  user: string,
  tag: string,
  track: IDbTrack
) => {
  await updateDoc(doc(db, 'users', user, 'tags', tag), {
    tracks: arrayRemove(track),
  });
};

const deleteList = async (user: string, tag: string) => {
  await deleteDoc(tagDoc(user, tag));
};

export {
  tagDoc,
  tagCol,
  // q,
  createTag,
  tagTrack,
  clearTrackFromTag,
  deleteList,
  createUserDoc,
};
