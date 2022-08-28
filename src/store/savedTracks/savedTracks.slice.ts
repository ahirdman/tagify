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
    initialLoad: (state, action: PayloadAction<ITracksStateObj>) => {
      state.total = action.payload.total;
      state.nextUrl = action.payload.nextUrl;
      state.savedTracks = action.payload.savedTracks;
      state.filteredTracks = action.payload.filteredTracks;
    },
    addTracks: (state, action: PayloadAction<IAddTracksPayload>) => {
      state.savedTracks.concat(action.payload.savedTracks);
      state.filteredTracks.concat(action.payload.filteredTracks);
    },
    filterTracks: (state, action: PayloadAction<string>) => {
      const regExp = new RegExp(action.payload, 'gmi');
      state.filteredTracks.filter((track: IUserSavedObject) =>
        regExp.test(track.track.name)
      );
    },
  },
});

export const { initialLoad, addTracks, filterTracks } =
  savedTracksSlice.actions;

export default savedTracksSlice.reducer;
