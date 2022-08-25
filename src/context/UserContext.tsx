import { onAuthStateChanged } from 'firebase/auth';
import * as React from 'react';
import { auth } from '../services/firebase/config';
import { getUserDocument } from '../services/firebase/firestore/firestore.service';
import { post, postWithCookie } from '../utils/httpClient';
import { initialUserState, userReducer } from '../reducers/user/user.reducer';
import { IUser } from '../reducers/user/user.interface';
import { UserActionTypes } from '../reducers/user/user.actions';
import { hasExpired, IExperationObj } from '../utils';
import { IFirestoreUserDocument } from '../services';

interface IUserContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const authorizeSpotify = async (uid: string) => {
  const response = await postWithCookie('/auth', { uid });
  return (window.location.href = response);
};

const refreshToken = async (uid: string, callback: any) => {
  const token = await post('/auth/refresh', { id: uid });
  if (!token) return;

  callback({
    type: UserActionTypes.SPOTIFY_TOKEN,
    payload: {
      accessToken: token.access_token,
      expires: token.expires_in,
    },
  });
};

const UserContext = React.createContext<IUser | null>(null);

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [user, dispatch] = React.useReducer(userReducer, initialUserState);

  const refreshTimerRef = React.useRef(null);

  const authObserver = () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch({
          type: UserActionTypes.FIREBASE_SIGN_IN,
          payload: {
            loggedIn: true,
            mail: user.email,
            fireId: user.uid,
          },
        });
      } else {
        dispatch({
          type: UserActionTypes.FIREBASE_SIGN_OUT,
          payload: initialUserState,
        });
      }
    });
  };

  /**
   * Listen for signed in or signed out to firebase
   */

  React.useEffect(() => {
    authObserver();
  }, []);

  /**
   * Get Spotify token when user is signed in
   */

  React.useEffect((): any => {
    if (user.loggedIn) {
      const refreshTimer = (milliseconds: number, uid: string) => {
        console.log('refresh timer set to:', milliseconds, 'seconds');

        refreshTimerRef.current = setTimeout(() => {
          console.log('refreshing something');
          refreshToken(uid, dispatch);
          refreshTimer(3590, uid);
        }, milliseconds * 1000);
      };

      const tokenService = async (doc: IFirestoreUserDocument, uid: string) => {
        const tokenHasExpired: IExperationObj = hasExpired(
          doc.spotifyTokenTimestamp,
          doc.spotifyExpires
        );

        if (tokenHasExpired.expired || tokenHasExpired.expiresIn < 60) {
          refreshToken(uid, dispatch);
          refreshTimer(tokenHasExpired.expiresIn - 10, uid);
        } else {
          dispatch({
            type: UserActionTypes.SPOTIFY_TOKEN,
            payload: {
              accessToken: doc.spotifyAccessToken,
              expires: tokenHasExpired.expiresIn,
            },
          });
          refreshTimer(tokenHasExpired.expiresIn - 10, uid);
        }
      };

      const spotifyAuthService = async (uid: string) => {
        const userDocument = await getUserDocument(uid);

        if (userDocument.spotifyAuth) {
          tokenService(userDocument, uid);
        } else {
          authorizeSpotify(uid);
        }
      };

      spotifyAuthService(user.fireId);

      return () => {
        clearTimeout(refreshTimerRef.current);
      };
    }
  }, [user.loggedIn, user.fireId]);

  /**
   * Get Spotify Profile when accessToken is obtained
   */

  React.useEffect(() => {
    if (user.spotify.accessToken) {
      const getSpotifyUserData = async () => {
        const spotifyUser = await post('/user', {
          token: user.spotify.accessToken,
        });
        dispatch({
          type: UserActionTypes.SPOTIFY_PROFILE,
          payload: {
            image: spotifyUser.images[0].url,
            name: spotifyUser.display_name,
            id: spotifyUser.id,
          },
        });
      };

      getSpotifyUserData();
    }
  }, [user.spotify.accessToken]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
