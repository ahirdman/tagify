import { ISavedObject } from '../interface';

/**
 * Actions Interface
 */

interface IAddTracksObj {
  nextUrl: string;
  savedTracks: ISavedObject[];
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

type IStateAction = InitalLoadAction | AddTracksAction | FilterTracksAction;

/**
 * Actions Definition
 */

export enum StateActionTypes {
  INITIAL_LOAD = 'initial',
  ADD_TRACKS = 'addTracks',
  FILTER_TRACKS = 'filterTracks',
}

/**
 * Reducer Interface
 */

export interface ITracksStateObj {
  total: number;
  nextUrl: string;
  savedTracks: ISavedObject[];
  filteredTracks: ISavedObject[];
}

/**
 * Reducer Definition
 */

export const initialTracksState: ITracksStateObj = {
  total: 0,
  nextUrl: '',
  savedTracks: [] as ISavedObject[],
  filteredTracks: [] as ISavedObject[],
};

export const savedTracksReducer = (
  state: ITracksStateObj,
  action: IStateAction
) => {
  const { type, payload } = action;

  switch (type) {
    case StateActionTypes.INITIAL_LOAD:
      return { ...payload };
    case StateActionTypes.ADD_TRACKS:
      return {
        ...state,
        nextUrl: payload.nextUrl,
        savedTracks: [...state.savedTracks, ...payload.savedTracks],
        filteredTracks: [...state.filteredTracks, ...payload.savedTracks],
      };
    case StateActionTypes.FILTER_TRACKS:
      const regExp = new RegExp(payload, 'gmi');
      return {
        ...state,
        filteredTracks: state.savedTracks.filter((track: ISavedObject) =>
          regExp.test(track.track.name)
        ),
      };
    default:
      throw new Error('reducer error');
  }
};
