import { IUserSavedObject } from '../../services/spotify/spotify.interface';

export interface ITracksStateObj {
  total: number;
  nextUrl: string;
  savedTracks: IUserSavedObject[];
  filteredTracks: IUserSavedObject[];
}

export type IAddTracksPayload = Omit<ITracksStateObj, 'total'>;
