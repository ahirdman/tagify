import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  firebaseSignIn,
  setSpotifyProfile,
  setSpotifyToken,
} from './user.slice';
import { Spotify, Firestore } from '../../services/index';
import { hasExpired, IExperationObj } from '../../utils';

// const refreshTimerRef = React.useRef(null);
// const refreshTimer = (milliseconds: number, uid: string) => {
//   console.log('refresh timer set to:', milliseconds, 'seconds');

//   refreshTimerRef.current = setTimeout(async () => {
//     const token = await Spotify.refreshToken(uid);

//     dispatch(
//       setSpotifyToken({
//         accessToken: token.access_token,
//         expires: token.expires_in,
//       })
//     );

//     refreshTimer(token.expires_in - 10, uid);
//   }, milliseconds * 1000);
// };

// Create the middleware instance and methods
export const signInMiddleware = createListenerMiddleware();
export const spotifyTokenMiddleware = createListenerMiddleware();

signInMiddleware.startListening({
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

    if (tokenHasExpired.expired || tokenHasExpired.expiresIn < 60) {
      const token = await Spotify.refreshToken(uid);

      listenerApi.dispatch(
        setSpotifyToken({
          accessToken: token.access_token,
          expires: token.expires_in,
        })
      );

      // refreshTimer(token.expires_in - 10, uid);
    } else {
      listenerApi.dispatch(
        setSpotifyToken({
          accessToken: doc.spotifyAccessToken,
          expires: tokenHasExpired.expiresIn,
        })
      );
      // refreshTimer(tokenHasExpired.expiresIn - 10, uid);
    }
  },
});

spotifyTokenMiddleware.startListening({
  actionCreator: setSpotifyToken,
  effect: async (action, listenerApi) => {
    const token = action.payload.accessToken;
    const data = await Spotify.getSpotifyUserData(token);

    listenerApi.dispatch(
      setSpotifyProfile({
        image: data.images[0].url,
        name: data.display_name,
        id: data.id,
      })
    );
  },
});

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
// listenerMiddleware.startListening({
//   actionCreator: todoAdded,
//   effect: async (action, listenerApi) => {
//     // Run whatever additional side-effect-y logic you want here
//     console.log('Todo added: ', action.payload.text)

//     // Can cancel other running instances
//     listenerApi.cancelActiveListeners()

//     // Run async logic
//     const data = await fetchData()

//     // Pause until action dispatched or state changed
//     if (await listenerApi.condition(matchSomeAction)) {
//       // Use the listener API methods to dispatch, get state,
//       // unsubscribe the listener, start child tasks, and more
//       listenerApi.dispatch(todoAdded('Buy pet food'))

//       // Spawn "child tasks" that can do more work and return results
//       const task = listenerApi.fork(async (forkApi) => {
//         // Can pause execution
//         await forkApi.delay(5)
//         // Complete the child by returning a value
//         return 42
//       })

//       const result = await task.result
//       // Unwrap the child result in the listener
//       if (result.status === 'ok') {
//         // Logs the `42` result value that was returned
//         console.log('Child succeeded: ', result.value)
//       }
//     }
//   },
// })
