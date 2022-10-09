import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  IFirebaseSignInPayload,
  ISpotifyProfilePayload,
  TokenPayload,
  IUser,
} from './user.interface';

const initialState: IUser = {
  mail: '',
  fireId: '',
  loggedIn: false,
  ready: false,
  spotify: {
    connected: false,
    token: '',
    profile: {
      image: '',
      name: '',
      id: '',
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    firebaseSignIn: (state, action: PayloadAction<IFirebaseSignInPayload>) => {
      const { mail, fireId } = action.payload;
      state.mail = mail;
      state.fireId = fireId;
      state.loggedIn = true;
    },

    firebaseSignOut: () => initialState,

    setSpotifyToken: (state, action: PayloadAction<TokenPayload>) => {
      const { token } = action.payload;
      state.spotify.token = token;
      state.spotify.connected = true;
    },

    setSpotifyProfile: (state, action: PayloadAction<ISpotifyProfilePayload>) => {
      state.spotify.profile = action.payload;
      state.spotify.connected = true;
      state.ready = true;
    },
  },
});

export const { firebaseSignIn, firebaseSignOut, setSpotifyToken, setSpotifyProfile } =
  userSlice.actions;

export default userSlice.reducer;

export const fireIdSelector = (state: RootState) => state.user.fireId;
