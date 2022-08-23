import { onAuthStateChanged } from 'firebase/auth';
import * as React from 'react';
import { auth } from '../firebase/config';
import { userDoc } from '../firebase/firestore';
import { get, post, postWithCookie } from '../httpClient';
import {
  initialUserState,
  IUser,
  UserActionTypes,
  userReducer,
} from '../reducers/userReducer';

interface IUserContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const UserContext = React.createContext<IUser | null>(null);

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [user, dispatch] = React.useReducer(userReducer, initialUserState);

  React.useEffect(() => {
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

    authObserver();
  }, []);

  /**
   * Get Spotify token when user is signed in
   */

  /**
   * TODO: If user.spotify.connected === true, obtain refreshtoken from users firestore document and fetch a new token from spotify.
   *  IF user.sptoify.connected === false, fire auth flow and write refresh token to users firestore document
   */

  React.useEffect(() => {
    if (!user.loggedIn) return;

    console.log('logged in');
    const getTokenWithRefresh = async () => {
      try {
        const token = await get('/auth/token');
        dispatch({
          type: UserActionTypes.SPOTIFY_TOKEN,
          payload: {
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            expires: token.expires_in,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

    const authorizeSpotify = async () => {
      const response = await postWithCookie('/auth', { uid: user.fireId });
      return (window.location.href = response);
    };

    const tokenService = async () => {
      const userDocument = await userDoc(user.fireId);

      if (userDocument.spotifyAuth) {
        console.log('connected ');
        // Get token from spotify api with existing refresh token
        // user.spotifyRefreshToken
        // Dispatch user object on success
        // getTokenWithRefresh();
        dispatch({
          type: UserActionTypes.SPOTIFY_TOKEN,
          payload: {
            accessToken: userDocument.spotifyAccessToken,
            refreshToken: userDocument.spotifyRefreshToken,
            expires: userDocument.spotifyExpires,
          },
        });
      } else {
        console.log('not connected');
        authorizeSpotify();
      }
    };

    tokenService();
  }, [user.loggedIn, user.fireId]);

  /**
   * Get Spotify Profile when accessToken is obtained
   */

  React.useEffect(() => {
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

    if (user.spotify.accessToken) {
      getSpotifyUserData();
    }
  }, [user.spotify.accessToken]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
