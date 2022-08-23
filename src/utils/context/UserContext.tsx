import { onAuthStateChanged } from 'firebase/auth';
import * as React from 'react';
import { auth } from '../firebase/config';
import { userDoc } from '../firebase/firestore';
import { get, post } from '../httpClient';
import { handleLogIn } from '../modules/modules';
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

    const getTokenWithRefresh = async () => {
      const token = await get('/auth/refresh');
      dispatch({
        type: UserActionTypes.SPOTIFY_TOKEN,
        payload: {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expires: token.expires_in,
        },
      });
    };

    const tokenService = async () => {
      const userDocument = await userDoc(user.fireId);

      if (userDocument.spotifyAuth === true) {
        console.log('connected ');
        // Get token from spotify api with existing refresh token
        // user.spotifyRefreshToken
        // Dispatch user object on success
        getTokenWithRefresh();
      } else {
        console.log('not connected');
        // handleLogIn();
        // Go through initial auth process
      }
    };

    tokenService();

    const refreshToken = async () => {
      const token = await get('/auth/refresh');

      // setUser((prevState: IUser) => ({
      //   ...prevState,
      //   spotify: {
      //     ...prevState.spotify,
      //     accessToken: token.access_token,
      //     refreshToken: token.refresh_token,
      //     expires: token.expires_in,
      //   },
      // }));
      setTimeout(() => refreshToken(), token.expires_in * 1000);
    };

    const getToken = async () => {
      try {
        const token = await get('/auth/token');

        // setUser((prevState: IUser) => ({
        //   ...prevState,
        //   spotify: {
        //     ...prevState.spotify,
        //     connected: true,
        //     accessToken: token.access_token,
        //     refreshToken: token.refresh_token,
        //     expires: token.expires_in,
        //   },
        // }));

        setTimeout(() => refreshToken(), token.expires_in * 1000);
      } catch (error) {
        console.log(error);
        user.loggedIn === true
          ? console.log(error)
          : localStorage.removeItem('spot');
      }
    };

    // if (localSpot === 'redirected') {
    //   getToken();
    // }
  }, [user.loggedIn]);

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
