import { IFirestoreTagDocument, SavedTracksData } from '../../services';
import { IMixMatch } from '../../utils/mixLists/mixLists';

export interface IPlaylist {
  id: string;
  createdAt: string;
  favourite: boolean;
  name: string;
  color: string;
  type: 'TAG' | 'MIXED';
  tracks: SavedTracksData[];
  exported: boolean;
  spotifyId: string;
  snapshotId: string;
  status?: {
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

export interface IPlaylistState {
  playlists: IPlaylist[];
  mixSuggestions: IMixMatch[];
}

export interface IUpdateSyncPayload {
  id: string;
  sync: 'SYNCED' | 'UNSYNCED' | 'UNKNOWN';
}

export interface IUpdatePlaylistData {
  data: IFirestoreTagDocument;
}

export interface IPlaylistsPayload {
  lists: IPlaylist[];
}

export interface IMixedMatchesPayload {
  matches: IMixMatch[];
}

export interface ITagTrackThunkArgs {
  playlistName: string;
  tracks: SavedTracksData[];
}
