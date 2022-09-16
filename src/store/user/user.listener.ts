import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  firebaseSignIn,
  // refreshSpotifyToken,
  setSpotifyProfile,
  setSpotifyToken,
} from './user.slice';
import { Spotify, Firestore } from '../../services/index';
import { hasExpired, IExperationObj } from '../../utils';
import type { TypedStartListening } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../store';

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const signIn = createListenerMiddleware();
export const spotifyToken = createListenerMiddleware();
export const refreshToken = createListenerMiddleware();

const startSignInListening = signIn.startListening as AppStartListening;
const startTokenListening = spotifyToken.startListening as AppStartListening;
// const startRefreshListening = spotifyToken.startListening as AppStartListening;

startSignInListening({
  actionCreator: firebaseSignIn,
  effect: async (action, listenerApi) => {
    const uid = action.payload.fireId;
    const doc = await Firestore.getUserDocument(uid);

    if (!doc.spotifyAuth) {
      Spotify.authorizeSpotify(uid);
    }

    const tokenHasExpired: IExperationObj = hasExpired(
      doc.spotifyTokenTimestamp,
      doc.spotifyExpires
    );

    console.log('token has epired:', tokenHasExpired.expired);
    console.log('token epires in:', tokenHasExpired.expiresIn);

    if (tokenHasExpired.expired || tokenHasExpired.expiresIn < 60) {
      const token = await Spotify.refreshToken(uid);

      listenerApi.dispatch(
        setSpotifyToken({
          accessToken: token.access_token,
          expires: token.expires_in,
        })
      );
    } else {
      listenerApi.dispatch(
        setSpotifyToken({
          accessToken: doc.spotifyAccessToken,
          expires: tokenHasExpired.expiresIn,
        })
      );
    }
  },
});

startTokenListening({
  actionCreator: setSpotifyToken,
  effect: async (action, listenerApi) => {
    const { expires, accessToken } = action.payload;
    const data = await Spotify.getSpotifyUserData(accessToken);

    listenerApi.dispatch(
      setSpotifyProfile({
        image: data.images[0].url,
        name: data.display_name,
        id: data.id,
      })
    );

    /**
     * MOVED LIESTENER LOGIC TO SDK PLAEYER CALLBACK
     */

    // const state = listenerApi.getState();
    // const uid = state.user.fireId;

    // await listenerApi.delay(expires * 1000);

    // const token = await Spotify.refreshToken(uid);

    // listenerApi.dispatch(
    //   refreshSpotifyToken({
    //     accessToken: token.access_token,
    //     expires: token.expires_in,
    //   })
    // );
  },
});

// startRefreshListening({
//   actionCreator: refreshSpotifyToken,
//   effect: async (action, listenerApi) => {
//     const { expires } = action.payload;

//     const state = listenerApi.getState();
//     const uid = state.user.fireId;

//     await listenerApi.delay(expires * 1000);

//     const token = await Spotify.refreshToken(uid);

//     listenerApi.dispatch(
//       refreshSpotifyToken({
//         accessToken: token.access_token,
//         expires: token.expires_in,
//       })
//     );
//   },
// });
