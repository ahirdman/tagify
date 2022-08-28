import { createSlice } from '@reduxjs/toolkit';

interface IAlbumImages {
  url: string;
}

interface IArtists {
  uri: string;
  name: string;
}

interface IWebPlaybackTrack {
  uri: string;
  id: string;
  type: string;
  media_type: string;
  name: string;
  is_playable: boolean;
  album: {
    uri: string;
    name: string;
    images: IAlbumImages[];
  };
  artists: IArtists[];
}

const initialState = {
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
  } as IWebPlaybackTrack,
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

export const {
  setPaused,
  setActive,
  setDeviceID,
  setCurrentTrack,
  clearPlayback,
} = playbackSlice.actions;

export default playbackSlice.reducer;
