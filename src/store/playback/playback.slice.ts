import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IAlbumImages, IArtists, IPlaybackState } from './playback.interface';
import { Spotify } from '../../services';

export const playSpotifyTrack = createAsyncThunk(
  'playback/playSpotifyTrack',
  async (uri: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { token } = state.user.spotify;
    const { deviceID } = state.playback;
    await Spotify.playTrack(deviceID, token, uri);
  },
  {
    condition: (uri: string, { getState }) => {
      const {
        playback: { deviceID },
      } = getState() as RootState;

      if (!deviceID || !uri) {
        return false;
      }

      return true;
    },
  }
);

const initialState: IPlaybackState = {
  isPaused: false,
  isActive: false,
  deviceID: '',
  currentTrack: {
    uri: '',
    id: '',
    type: '',
    media_type: '',
    name: '',
    is_playable: false,
    album: {
      uri: '',
      name: '',
      images: [] as IAlbumImages[],
    },
    artists: [] as IArtists[],
  },
};

export const playbackSlice = createSlice({
  name: 'playback',
  initialState,
  reducers: {
    setPaused: (state, action) => {
      state.isPaused = action.payload;
    },
    setActive: (state, action) => {
      state.isActive = action.payload;
    },
    setDeviceID: (state, action) => {
      state.deviceID = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    clearPlayback: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(playSpotifyTrack.fulfilled, () => {
        console.log('fullfilled, playing track');
      })
      .addCase(playSpotifyTrack.pending, () => {
        console.log('pending, playing track soon');
      });
  },
});

export const { setPaused, setActive, setDeviceID, setCurrentTrack, clearPlayback } =
  playbackSlice.actions;

export default playbackSlice.reducer;

export const playBackInfoSelector = createSelector(
  [(state: RootState) => state.playback.currentTrack],
  currentTrack => ({
    image: currentTrack.album.images[0].url,
    name: currentTrack.name,
    artist: currentTrack.artists[0].name,
  })
);

export const isActiveSelector = (state: RootState): boolean => state.playback.isActive;
