import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  IAddTracksPayload,
  InitialPayload,
  ITracksStateObj,
  SelectPayload,
} from './savedTracks.interface';
import { SavedTracksData } from '../../services/spotify/spotify.interface';
import { RootState } from '../store';

const initialState: ITracksStateObj = {
  total: 0,
  nextUrl: '',
  savedTracks: [] as SavedTracksData[],
  filteredTracks: [] as SavedTracksData[],
  selectedTrack: null,
};

export const savedTracksSlice = createSlice({
  name: 'savedTracks',
  initialState,
  reducers: {
    initialLoad: (state, { payload }: PayloadAction<InitialPayload>) => {
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
        (track: SavedTracksData) => regExp.test(track.name)
      );
    },
    setSelectedTrack: (state, { payload }: PayloadAction<SelectPayload>) => {
      state.selectedTrack = payload;
    },
  },
});

export const { initialLoad, addTracks, filterTracks, setSelectedTrack } =
  savedTracksSlice.actions;

export default savedTracksSlice.reducer;

export const selectedTrackSelector = (state: RootState) =>
  state.savedTracks.selectedTrack;

// export const filterSelector = createSelector(
//   [(state: RootState) => state.savedTracks.filteredTracks],
//   filterTracks => filterTracks
// );
