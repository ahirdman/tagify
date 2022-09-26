import { SavedTracksData } from '../../services';

export interface SelectListPayload {
  selectedList: string | null;
}

export interface PlaylistState {
  selectedList: string | null;
  tracks: [] | SavedTracksData[];
}

export interface SetTracksPayload {
  tracks: SavedTracksData[];
}
