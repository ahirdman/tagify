import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  IFirebaseSignInPayload,
  ISpotifyProfilePayload,
  TokenPayload,
  IUser,
} from './user.interface';
import { Spotify } from '../../services';
import { ITopItem } from '../../common/common.interface';

export const fetchTopItems = createAsyncThunk('user/getTopItems', async (_, thunkAPI) => {
  const {
    user: {
      spotify: { token },
    },
  } = thunkAPI.getState() as RootState;

  const data = await Spotify.getSpotifyTopItems(token);

  return data.items;
});

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
    topItems: {
      items: [] as ITopItem[],
      loading: false,
      error: false,
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
  extraReducers: builder => {
    builder
      .addCase(fetchTopItems.fulfilled, (state, action) => {
        state.spotify.topItems.error = false;
        state.spotify.topItems.loading = false;
        state.spotify.topItems.items = action.payload;
      })
      .addCase(fetchTopItems.pending, state => {
        state.spotify.topItems.error = false;
        state.spotify.topItems.loading = true;
      })
      .addCase(fetchTopItems.rejected, state => {
        state.spotify.topItems.loading = false;
        state.spotify.topItems.error = true;
      });
  },
});

export const { firebaseSignIn, firebaseSignOut, setSpotifyToken, setSpotifyProfile } =
  userSlice.actions;

export default userSlice.reducer;

export const fireIdSelector = (state: RootState) => state.user.fireId;

export const topItemsSelector = (state: RootState) => state.user.spotify.topItems;
