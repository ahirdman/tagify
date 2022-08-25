import { onAuthStateChanged } from 'firebase/auth';
import * as React from 'react';
import { auth } from '../services/firebase/config';
import { getUserDocument } from '../services/firebase/firestore/firestore.service';
import { initialUserState, userReducer } from '../reducers/user/user.reducer';
import { IUser } from '../reducers/user/user.interface';
import { UserActionTypes } from '../reducers/user/user.actions';
import { hasExpired, IExperationObj } from '../utils';
import { IFirestoreUserDocument } from '../services';
import { Spotify } from '../services';

interface IUserContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

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

        refreshTimerRef.current = setTimeout(async () => {
          console.log('refreshing something');
          const token = await Spotify.refreshToken(uid);

          dispatch({
            type: UserActionTypes.SPOTIFY_TOKEN,
            payload: {
              accessToken: token.access_token,
              expires: token.expires_in,
            },
          });

          refreshTimer(token.expires_in - 10, uid);
        }, milliseconds * 1000);
      };

      const tokenService = async (doc: IFirestoreUserDocument, uid: string) => {
        const tokenHasExpired: IExperationObj = hasExpired(
          doc.spotifyTokenTimestamp,
          doc.spotifyExpires
        );

        if (tokenHasExpired.expired || tokenHasExpired.expiresIn < 60) {
          const token = await Spotify.refreshToken(uid);

          dispatch({
            type: UserActionTypes.SPOTIFY_TOKEN,
            payload: {
              accessToken: token.access_token,
              expires: token.expires_in,
            },
          });

          refreshTimer(token.expires_in - 10, uid);
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
          Spotify.authorizeSpotify(uid);
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
      const getSpotifyUserData = async (token: string) => {
        const data = await Spotify.getSpotifyUserData(token);

        dispatch({
          type: UserActionTypes.SPOTIFY_PROFILE,
          payload: {
            image: data.images[0].url,
            name: data.display_name,
            id: data.id,
          },
        });
      };

      getSpotifyUserData(user.spotify.accessToken);
    }
  }, [user.spotify.accessToken]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
