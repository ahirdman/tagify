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
import { IPlaylist } from '../../../store/playlists/playlists.interface';
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
  const tags: IPlaylist[] = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();

    tags.push({
      id: data.id,
      createdAt: data.createdAt,
      favourite: data.favourite,
      name: data.name,
      color: data.color,
      type: data.type,
      tracks: data.tracks,
      exported: data.exported,
      spotifyId: data.playlistId,
      snapshotId: data.snapshotId,
      status: {
        sync: 'UNKNOWN',
        exporting: false,
        error: false,
      },
    });
  });

  return tags;
};

export const createList = async (
  user: string,
  tagId: string,
  tagName: string,
  color: string,
  type: 'TAG' | 'MIXED',
  track?: SavedTracksData[]
) => {
  const newList: IPlaylist = {
    id: tagId,
    createdAt: new Date().toISOString(),
    favourite: false,
    name: tagName,
    color: color,
    type,
    tracks: track ? track : [],
    exported: false,
    spotifyId: '',
    snapshotId: '',
  };
  await setDoc(userTagDocRef(user, tagName), newList, { merge: true });
};

export const addTagsToTrack = async (user: string, tag: string, tracks: SavedTracksData[]) => {
  await updateDoc(userTagDocRef(user, tag), {
    tracks: arrayUnion(...tracks),
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
