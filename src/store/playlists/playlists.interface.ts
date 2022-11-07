import { IFirestoreTagDocument, SavedTracksData } from '../../services';

export interface Playlist {
  id: string;
  name: string;
  color: string;
  type: 'TAG' | 'MIXED';
  created?: boolean;
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

export interface IPlaylistStatus {
  sync: 'SYNCED' | 'UNSYNCED' | 'UNKNOWN';
  exporting: boolean;
  error: boolean;
}

export interface PlaylistState {
  playlists: Playlist[];
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

export interface SetPlaylistsPayload {
  lists: Playlist[];
}
export interface AddPlaylistsPayload {
  lists: Playlist[];
}
