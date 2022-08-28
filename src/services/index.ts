// import {
//   IFirestoreUserDocument,
//   IFirestoreTimestamp,
//   IFirestoreTrack,
// } from './firebase/firestore/firestore.interface';
import * as Spotify from './spotify/spotify.controller';
import * as FirebaseAuth from './firebase/auth/auth.controller';
import * as Firestore from './firebase/firestore/firestore.service';

export interface IFirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface IFirestoreUserDocument {
  spotifyAuth: boolean;
  spotifyAccessToken: string;
  spotifyRefreshToken: string;
  spotifyExpires: number;
  spotifyTokenTimestamp: IFirestoreTimestamp;
}

export interface IFirestoreTrack {
  artist: string;
  title: string;
  artwork: string;
  uri: string;
}

export {
  // IFirestoreUserDocument,
  // IFirestoreTimestamp,
  // IFirestoreTrack,
  Spotify,
  FirebaseAuth,
  Firestore,
};
