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
  name: string;
  color: string;
  tracks: SavedTracksData[];
  spotifySync: {
    exported: boolean;
    playlistId: string;
    snapshotId: string;
  };
}
