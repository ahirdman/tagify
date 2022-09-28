import { IFirestoreTagDocument } from '../../services';

// name: string,
// color: data.color,
// tracks: SavedTracks[],
// spotifySync: {
//   exported: boolean,
//   playlistId: string,
//   snapshotId: string,
// },
// status: {
//   sync: 'SYNCED' | 'UNSYNCED';
//   exporting: boolean;
//   error: boolean;
// }

export interface SelectedList extends IFirestoreTagDocument {
  status: {
    sync: 'SYNCED' | 'UNSYNCED' | 'UNKNOWN';
    exporting: boolean;
    error: boolean;
  };
}

export interface PlaylistState {
  tagLists: SelectedList[];
  selectedList: SelectedList | null;
}

export interface SelectListPayload {
  selectedList: SelectedList | null;
}

export interface UpdateSyncPayload {
  sync: 'SYNCED' | 'UNSYNCED' | 'UNKNOWN';
}

export interface UpdateStateDockPayload {
  doc: IFirestoreTagDocument;
}

export interface SetTagListsPayload {
  lists: SelectedList[];
}
