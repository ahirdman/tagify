import { SavedTracksData } from '../../services/spotify/spotify.interface';

export interface ITracksStateObj {
  total: number;
  nextUrl: string;
  savedTracks: SavedTracksData[];
  filteredTracks: SavedTracksData[];
  selectedTrack: null | SavedTracksData;
  loading: boolean;
  allTracksLoaded: boolean;
}

export type SelectPayload = null | SavedTracksData;
