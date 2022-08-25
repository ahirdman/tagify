import { IUserSavedObject } from '../../services/spotify/spotify.interface';
import { StateActionTypes } from './savedTracks.actions';
import { IStateAction, ITracksStateObj } from './savedTracks.interface';

export const initialTracksState: ITracksStateObj = {
  total: 0,
  nextUrl: '',
  savedTracks: [] as IUserSavedObject[],
  filteredTracks: [] as IUserSavedObject[],
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
        filteredTracks: state.savedTracks.filter((track: IUserSavedObject) =>
          regExp.test(track.track.name)
        ),
      };
    default:
      throw new Error('reducer error');
  }
};
