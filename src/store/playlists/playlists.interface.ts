import { IFirestoreTrack } from '../../services';

export interface SelectListPayload {
  selectedList: string | null;
}

export interface PlaylistState {
  selectedList: string | null;
  tracks: [] | IFirestoreTrack[];
}

export interface SetTracksPayload {
  tracks: IFirestoreTrack[];
}
