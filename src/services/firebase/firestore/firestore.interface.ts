import { SavedTracksData } from '../../spotify/spotify.interface';

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

export interface IFirestoreTagDocument {
  id: string;
  name: string;
  color: string;
  tracks: SavedTracksData[];
  exported: boolean;
  spotifyId: string;
  snapshotId: string;
}
