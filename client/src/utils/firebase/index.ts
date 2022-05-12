// Import the functions you need from the SDKs you need
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import db from './config';

//Select all documents in the users collection
// export const usersRef = collection(db, 'users');

// Select the fields for the specified user
export const userDocRef = doc(db, 'users', 'creamBeam');

// export const getAllTags = async (userTags: Function, trackTags: Function) => {
//   const userDocument = await getDoc(userDocRef);

//   // WHole object with tag as key and array of tracks as value
//   const tagObject = userDocument.data().tags;

//   // Creates array of tag names
//   const tags = Object.keys(tagObject);

//   userTags(tags);
//   trackTags(tagObject);
// };

export const addNewTag = async (tagName: string, trackId: string) => {
  await updateDoc(userDocRef, {
    ['tags.' + tagName]: [trackId],
  });
};

export const addExistingTag = async (tagName: string, trackId: string) => {
  await updateDoc(userDocRef, {
    ['tags.' + tagName]: arrayUnion(trackId),
  });
};

export const removeTrackTag = async (tagName: string, trackId: string) => {
  await updateDoc(userDocRef, {
    ['tags.' + tagName]: arrayRemove(trackId),
  });
};
