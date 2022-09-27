import { db, fieldValue } from '../index';

const userDocRef = (uid: string) => db.doc(`users/${uid}`);
const tagDocRef = (uid: string, tag: string) => db.doc(`users/${uid}/tags/${tag}`);

export const updateTagDocPlaylist = async (
  uid: string,
  tagName: string,
  snapshotId: string,
  playlistId?: string
) => {
  await tagDocRef(uid, tagName).update({
    spotifySync: {
      exported: true,
      latestChange: new Date(),
      snapshotId,
      playlistId: playlistId ? playlistId : '',
    },
  });
};

export const setUserDoc = async (
  uid: string,
  accessToken: string,
  expiresIn: number,
  refreshToken: string
) => {
  await userDocRef(uid).set({
    spotifyAuth: true,
    spotifyAccessToken: accessToken,
    spotifyRefreshToken: refreshToken,
    spotifyExpires: expiresIn,
    spotifyTokenTimestamp: fieldValue.serverTimestamp(),
  });
};

export const updateUserDoc = async (uid: string, accessToken: string, expiresIn: number) => {
  await userDocRef(uid).update({
    spotifyAccessToken: accessToken,
    spotifyExpires: expiresIn,
    spotifyTokenTimestamp: fieldValue.serverTimestamp(),
  });
};

export const getUserDoc = async (uid: string) => {
  const docRef = db.doc(`users/${uid}`);

  const document = await docRef.get();

  if (document.exists) {
    return document.data();
  } else {
    return 'Not Found';
  }
};
