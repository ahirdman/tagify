import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ISetTaggedTracksPayload, IStatistics } from './stats.interface';

const initialState: IStatistics = {
  taggedTracks: 0,
  createdTags: 0,
  createdMixes: 0,
  totalSavedTracks: 0,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setTaggedTracks: (state, action: PayloadAction<ISetTaggedTracksPayload>) => {
      state.taggedTracks = action.payload.amount;
    },
  },
});

export const { setTaggedTracks } = statsSlice.actions;

export default statsSlice.reducer;
