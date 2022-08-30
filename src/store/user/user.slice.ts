import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: IUser = {
  mail: '',
  fireId: '',
  loggedIn: false,
  ready: false,
  spotify: {
    connected: false,
    profile: {
      image: '',
      name: '',
      id: '',
    },
    accessToken: '',
    expires: -1,
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
    setSpotifyToken: (state, action: PayloadAction<ITokenPayload>) => {
      const { expires, accessToken } = action.payload;
      state.spotify.accessToken = accessToken;
      state.spotify.expires = expires;
    },
    setSpotifyProfile: (
      state,
      action: PayloadAction<ISpotifyProfilePayload>
    ) => {
      state.spotify.profile = action.payload;
      state.ready = true;
    },
  },
});

export const {
  firebaseSignIn,
  firebaseSignOut,
  setSpotifyToken,
  setSpotifyProfile,
} = userSlice.actions;

export default userSlice.reducer;

export const fireIdSelector = (state: RootState) => state.user.fireId;
