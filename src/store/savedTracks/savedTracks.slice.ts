import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ITracksStateObj, SelectPayload } from './savedTracks.interface';
import { RootState } from '../store';
import { Spotify, SavedTracksData } from '../../services';

export const fetchInitialTracks = createAsyncThunk('tracks/getInitial', async (_, thunkAPI) => {
  const {
    user: {
      spotify: { token },
    },
  } = thunkAPI.getState() as RootState;

  const data = await Spotify.getInitialSavedTracks(token);

  return data;
});

export const fetchNextTracks = createAsyncThunk(
  'tracks/getnext',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { token } = state.user.spotify;
    const { nextUrl } = state.savedTracks;
    const data = await Spotify.getNextSavedTracks(token, nextUrl);

    return data;
  },
  {
    condition: (_, { getState }) => {
      const {
        savedTracks: { loading, allTracksLoaded },
      } = getState() as RootState;

      if (loading || allTracksLoaded) {
        return false;
      }

      return true;
    },
  }
);

const initialState: ITracksStateObj = {
  total: 0,
  nextUrl: '',
  savedTracks: [] as SavedTracksData[],
  filteredTracks: [] as SavedTracksData[],
  selectedTrack: null,
  loading: false,
  allTracksLoaded: false,
};

export const savedTracksSlice = createSlice({
  name: 'savedTracks',
  initialState,
  reducers: {
    filterTracks: (state, { payload }: PayloadAction<string>) => {
      const regExp = new RegExp(payload, 'gmi');
      state.filteredTracks = state.savedTracks.filter((track: SavedTracksData) =>
        regExp.test(track.name)
      );
    },
    setSelectedTrack: (state, { payload }: PayloadAction<SelectPayload>) => {
      state.selectedTrack = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInitialTracks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchInitialTracks.fulfilled, (state, { payload }) => {
        state.total = payload.total;
        state.nextUrl = payload.nextUrl;
        state.savedTracks = payload.savedTracks;
        state.filteredTracks = payload.filteredTracks;
        state.loading = false;
      })
      .addCase(fetchNextTracks.pending, state => {
        state.loading = true;
      })
      .addCase(fetchNextTracks.fulfilled, (state, { payload }) => {
        state.nextUrl = payload.nextUrl;
        state.savedTracks = state.savedTracks.concat(payload.savedTracks);
        state.filteredTracks = state.filteredTracks.concat(payload.filteredTracks);
        state.allTracksLoaded = state.total === state.savedTracks.length;
        state.loading = false;
      });
  },
});

export const { filterTracks, setSelectedTrack } = savedTracksSlice.actions;

export default savedTracksSlice.reducer;

export const selectedTrackSelector = (state: RootState) => state.savedTracks.selectedTrack;
