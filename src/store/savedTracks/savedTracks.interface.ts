import { SavedTracksData } from '../../services/spotify/spotify.interface';

export interface ITracksStateObj {
  total: number;
  nextUrl: string;
  savedTracks: SavedTracksData[];
  filteredTracks: SavedTracksData[];
  selectedTrack: null | SavedTracksData;
}

export type InitialPayload = Omit<ITracksStateObj, 'selectedTrack'>;

export type IAddTracksPayload = Omit<
  ITracksStateObj,
  'total' | 'selectedTrack'
>;

export type SelectPayload = null | SavedTracksData;
