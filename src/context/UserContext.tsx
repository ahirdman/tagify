import { onAuthStateChanged } from 'firebase/auth';
import * as React from 'react';
import { auth } from '../services/firebase/config';
import { getUserDocument } from '../services/firebase/firestore';
import { post, postWithCookie } from '../utils/httpClient';
import { initialUserState, userReducer } from '../reducers/user/user.reducer';
import { IUser } from '../reducers/user/user.interface';
import { UserActionTypes } from '../reducers/user/user.actions';

interface IFirebaseTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface IFirebaseUserDocument {
  spotifyAuth: boolean;
  spotifyAccessToken: string;
  spotifyRefreshToken: string;
  spotifyExpires: number;
  spotifyTokenTimestamp: IFirebaseTimestamp;
}

interface IUserContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const addSeconds = (numOfSeconds: number, date = new Date()) => {
  date.setSeconds(date.getSeconds() + numOfSeconds);

  return date;
};

interface IExperationObj {
  expired: boolean;
  expiresIn: number | null;
}

const getSecondsDiff = (startDate: any, endDate: any) => {
  const msInSecond = 1000;

  return Math.round(Math.abs(endDate - startDate) / msInSecond);
};

const hasExpired = (timestamp: any, expiresInSec: number): IExperationObj => {
  const msInSecond = 1000;
  const tokenRecived = new Date(timestamp.seconds * msInSecond);

  // Decrease by 10 seconds to give time to fetch new token
  const experationTime = addSeconds(expiresInSec - 10, tokenRecived);
  console.log('token expires date:', experationTime);

  if (experationTime <= new Date()) {
    return {
      expired: true,
      expiresIn: null,
    };
  } else {
    const remainingSeconds = getSecondsDiff(experationTime, new Date());
    console.log('token expires in sec:', remainingSeconds);
    return {
      expired: false,
      expiresIn: remainingSeconds,
    };
  }
};

const authorizeSpotify = async (uid: string) => {
  const response = await postWithCookie('/auth', { uid });
  return (window.location.href = response);
};

const UserContext = React.createContext<IUser | null>(null);

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [user, dispatch] = React.useReducer(userReducer, initialUserState);

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

  React.useEffect(() => {
    if (!user.loggedIn) return;

    const refreshToken = async (uid: string) => {
      const token = await post('/auth/refresh', { id: uid });
      if (!token) return;

      dispatch({
        type: UserActionTypes.SPOTIFY_TOKEN,
        payload: {
          accessToken: token.access_token,
          expires: token.expires_in,
        },
      });
    };

    // const refreshTimer = (milliSeconds: number, uid: string) => {
    //   setTimeout(() => {
    //     console.log('refreshing something');
    //     refreshToken(uid);
    //     refreshTimer(milliSeconds, uid);
    //   }, milliSeconds * 1000);
    // };

    const tokenService = async (doc: IFirebaseUserDocument, uid: string) => {
      const tokenHasExpired: IExperationObj = hasExpired(
        doc.spotifyTokenTimestamp,
        doc.spotifyExpires
      );

      if (tokenHasExpired.expired) {
        refreshToken(uid);
      } else {
        dispatch({
          type: UserActionTypes.SPOTIFY_TOKEN,
          payload: {
            accessToken: doc.spotifyAccessToken,
            expires: doc.spotifyExpires,
          },
        });
      }

      // Call a function that counts down untill expiration and refreshes token
      // refreshTimer(doc.spotifyExpires, uid);
      // Abort timer
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
