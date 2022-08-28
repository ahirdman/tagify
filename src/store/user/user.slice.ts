import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  mail: string;
  fireId: string;
  loggedIn: boolean;
  spotify: {
    connected: boolean;
    profile: {
      image: string;
      name: string;
      id: string;
    };
    accessToken: string;
    expires: number;
  };
}

interface IFirebaseSignInPayload {
  mail: string;
  fireId: string;
}

interface ITokenPayload {
  accessToken: string;
  expires: number;
}

interface ISpotifyProfilePayload {
  image: string;
  name: string;
  id: string;
}

const initialState: IUser = {
  mail: '',
  fireId: '',
  loggedIn: false,
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
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.mail = action.payload.mail;
      state.fireId = action.payload.fireId;
      state.loggedIn = true;
    },
    firebaseSignOut: () => initialState,
    setSpotifyToken: (state, action: PayloadAction<ITokenPayload>) => {
      state.spotify.accessToken = action.payload.accessToken;
      state.spotify.expires = action.payload.expires;
    },
    setSpotifyProfile: (
      state,
      action: PayloadAction<ISpotifyProfilePayload>
    ) => {
      state.spotify.profile.image = action.payload.image;
      state.spotify.profile.name = action.payload.name;
      state.spotify.profile.id = action.payload.id;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  firebaseSignIn,
  firebaseSignOut,
  setSpotifyToken,
  setSpotifyProfile,
} = userSlice.actions;

export default userSlice.reducer;
