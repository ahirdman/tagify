import { SavedTracksData } from '../../services';

export interface SelectListPayload {
  selectedList: string | null;
}

export interface PlaylistState {
  selectedList: string | null;
  tracks: [] | SavedTracksData[];
  sync: {
    status: 'SYNCED' | 'UNSYNCED';
    exporting: boolean;
    error: boolean;
  };
}

export interface SetTracksPayload {
  tracks: SavedTracksData[];
}
