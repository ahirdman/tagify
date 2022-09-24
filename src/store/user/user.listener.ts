import { createListenerMiddleware } from '@reduxjs/toolkit';
import { firebaseSignIn, setSpotifyProfile, setSpotifyToken } from './user.slice';
import { Spotify, Firestore } from '../../services/index';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const signIn = createListenerMiddleware();
export const spotifyToken = createListenerMiddleware();
export const refreshToken = createListenerMiddleware();

const startSignInListening = signIn.startListening as AppStartListening;
const startTokenListening = spotifyToken.startListening as AppStartListening;

startSignInListening({
  actionCreator: firebaseSignIn,
  effect: async (action, listenerApi) => {
    const uid = action.payload.fireId;
    const doc = await Firestore.getUserDocument(uid);

    if (!doc.spotifyAuth) {
      Spotify.authorizeSpotify(uid);
    }

    const token = await Spotify.getSpotifyToken();

    listenerApi.dispatch(
      setSpotifyToken({
        token: token.data.accessToken,
      })
    );
  },
});

startTokenListening({
  actionCreator: setSpotifyToken,
  effect: async (action, listenerApi) => {
    const { token } = action.payload;
    const state = listenerApi.getState();

    if (!state.user.spotify.profile.id) {
      const results = await Spotify.getSpotifyProfile({ token });

      listenerApi.dispatch(setSpotifyProfile(results.data));
    }
  },
});
