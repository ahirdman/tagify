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
  getDocs,
} from 'firebase/firestore';
import { Playlist } from '../../../store/playlists/playlists.interface';
import { SavedTracksData } from '../../spotify/spotify.interface';
import { db } from '../config';

/**
 * Firebase References
 */

const userDocRef = (uid: string) => doc(db, 'users', uid);
const userTagDocRef = (user: string, tag: string) => doc(db, 'users', user, 'tags', tag);
const userTagCollectionRef = (user: string) => collection(db, `users/${user}/tags`);

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

export const getAllTags = async (user: string) => {
  const querySnapshot = await getDocs(userTagCollectionRef(user));
  const tags: Playlist[] = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();

    tags.push({
      id: data.id,
      name: data.name,
      color: data.color,
      type: 'TAG',
      tracks: data.tracks,
      exported: data.exported,
      playlistId: data.playlistId,
      snapshotId: data.snapshotId,
      isActive: false,
      status: {
        sync: 'UNKNOWN',
        exporting: false,
        error: false,
      },
    });
  });

  return tags;
};

export const createTag = async (
  user: string,
  tagId: string,
  tagName: string,
  color: string,
  track?: SavedTracksData
) => {
  await setDoc(
    userTagDocRef(user, tagName),
    {
      id: tagId,
      name: tagName,
      color: color,
      tracks: track ? [track] : [],
      exported: false,
      playlistId: '',
      snapshotId: '',
    },
    { merge: true }
  );
};

export const addTagToTrack = async (user: string, tag: string, track: SavedTracksData) => {
  await updateDoc(userTagDocRef(user, tag), {
    tracks: arrayUnion(track),
  });
};

export const clearTrackFromTag = async (user: string, tag: string, track: SavedTracksData) => {
  await updateDoc(userTagDocRef(user, tag), {
    tracks: arrayRemove(track),
  });
};

export const deleteList = async (user: string, tag: string) => {
  await deleteDoc(userTagDocRef(user, tag));
};
