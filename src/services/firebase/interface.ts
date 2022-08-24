export interface IFirebaseTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface IFirebaseUserDocument {
  spotifyAuth: boolean;
  spotifyAccessToken: string;
  spotifyRefreshToken: string;
  spotifyExpires: number;
  spotifyTokenTimestamp: IFirebaseTimestamp;
}
