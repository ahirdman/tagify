import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IAlbumImages, IArtists, IPlaybackState } from './playback.interface';

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
});

export const playBackInfoSelector = createSelector(
  [(state: RootState) => state.playback.currentTrack],
  currentTrack => ({
    image: currentTrack.album.images[0].url,
    name: currentTrack.name,
    artist: currentTrack.artists[0].name,
  })
);

export const isActiveSelector = createSelector(
  [(state: RootState) => state.playback.isActive],
  isActive => isActive
);

export const {
  setPaused,
  setActive,
  setDeviceID,
  setCurrentTrack,
  clearPlayback,
} = playbackSlice.actions;

export default playbackSlice.reducer;
