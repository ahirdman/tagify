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
