import { IFirestoreTagDocument, SavedTracksData } from '../../services';

// name: string,
// color: data.color,
// tracks: SavedTracks[],
// exported: boolean,
// playlistId: string,
// snapshotId: string,
// status: {
//   sync: 'SYNCED' | 'UNSYNCED';
//   exporting: boolean;
//   error: boolean;
// }

export interface Playlist {
  name: string;
  color: string;
  tracks: SavedTracksData[];
  exported: boolean;
  playlistId: string;
  snapshotId: string;
  isActive: boolean;
  status: {
    sync: 'SYNCED' | 'UNSYNCED' | 'UNKNOWN';
    exporting: boolean;
    error: boolean;
  };
}

export interface PlaylistState {
  tagLists: Playlist[];
}

export interface SelectListPayload {
  selectedList: string;
}

export interface UpdateSyncPayload {
  sync: 'SYNCED' | 'UNSYNCED' | 'UNKNOWN';
}

export interface UpdatePlaylistData {
  data: IFirestoreTagDocument;
}

export interface SetTagListsPayload {
  lists: Playlist[];
}
