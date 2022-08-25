import { IUserSavedObject } from '../../services/spotify/spotify.interface';
import { StateActionTypes } from './savedTracks.actions';

export interface ITracksStateObj {
  total: number;
  nextUrl: string;
  savedTracks: IUserSavedObject[];
  filteredTracks: IUserSavedObject[];
}

interface IAddTracksObj {
  nextUrl: string;
  savedTracks: IUserSavedObject[];
}

type InitalLoadAction = {
  type: StateActionTypes.INITIAL_LOAD;
  payload: ITracksStateObj;
};

type AddTracksAction = {
  type: StateActionTypes.ADD_TRACKS;
  payload: IAddTracksObj;
};

type FilterTracksAction = {
  type: StateActionTypes.FILTER_TRACKS;
  payload: string;
};

export type IStateAction =
  | InitalLoadAction
  | AddTracksAction
  | FilterTracksAction;
