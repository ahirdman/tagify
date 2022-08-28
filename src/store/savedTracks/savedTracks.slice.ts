import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUserSavedObject } from '../../services/spotify/spotify.interface';

interface ITracksStateObj {
  total: number;
  nextUrl: string;
  savedTracks: IUserSavedObject[];
  filteredTracks: IUserSavedObject[];
}

interface IAddTracksPayload {
  nextUrl: string;
  savedTracks: IUserSavedObject[];
  filteredTracks: IUserSavedObject[];
}

const initialState: ITracksStateObj = {
  total: 0,
  nextUrl: '',
  savedTracks: [] as IUserSavedObject[],
  filteredTracks: [] as IUserSavedObject[],
};

export const savedTracksSlice = createSlice({
  name: 'savedTracks',
  initialState,
  reducers: {
    initialLoad: (state, { payload }: PayloadAction<ITracksStateObj>) => {
      state.total = payload.total;
      state.nextUrl = payload.nextUrl;
      state.savedTracks = payload.savedTracks;
      state.filteredTracks = payload.filteredTracks;
    },
    addTracks: (state, { payload }: PayloadAction<IAddTracksPayload>) => {
      state.savedTracks = state.savedTracks.concat(payload.savedTracks);
      state.filteredTracks = state.filteredTracks.concat(
        payload.filteredTracks
      );
      state.nextUrl = payload.nextUrl;
    },
    filterTracks: (state, { payload }: PayloadAction<string>) => {
      const regExp = new RegExp(payload, 'gmi');
      state.filteredTracks = state.savedTracks.filter(
        (track: IUserSavedObject) => regExp.test(track.track.name)
      );
    },
  },
});

export const { initialLoad, addTracks, filterTracks } =
  savedTracksSlice.actions;

export default savedTracksSlice.reducer;
