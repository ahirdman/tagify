export interface IFirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface IFirebaseUserDocument {
  spotifyAuth: boolean;
  spotifyAccessToken: string;
  spotifyRefreshToken: string;
  spotifyExpires: number;
  spotifyTokenTimestamp: IFirebaseTimestamp;
}
