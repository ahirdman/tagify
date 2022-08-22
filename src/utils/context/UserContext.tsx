import * as React from 'react';
import { createContext, useEffect, useState } from 'react';
import { get, post } from '../httpClient';
import { authObserver } from '../firebase/auth';

export interface IUser {
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
    refreshToken: string;
    expires: number;
  };
}

const userObject: IUser = {
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
    refreshToken: '',
    expires: -1,
  },
};

interface IUserContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const UserContext = createContext<IUser | null>(null);

const UserContextProvider = ({ children }: IUserContextProviderProps) => {
  const [user, setUser] = useState<IUser>(userObject);

  useEffect(() => {
    authObserver(setUser, userObject);
  }, []);

  useEffect(() => {
    const localSpot = localStorage.getItem('spot');

    const refreshToken = async () => {
      const token = await get('/auth/refresh');

      setUser((prevState: IUser) => ({
        ...prevState,
        spotify: {
          ...prevState.spotify,
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expires: token.expires_in,
        },
      }));
      console.log('refreshed token');
      setTimeout(() => refreshToken(), token.expires_in * 1000);
    };

    const getToken = async () => {
      try {
        const token = await get('/auth/token');

        setUser((prevState: IUser) => ({
          ...prevState,
          spotify: {
            ...prevState.spotify,
            connected: true,
            accessToken: token.access_token,
            refreshToken: token.refresh_token,
            expires: token.expires_in,
          },
        }));

        setTimeout(() => refreshToken(), token.expires_in * 1000);
      } catch (error) {
        console.log(error);
        user.loggedIn === true
          ? console.log(error)
          : localStorage.removeItem('spot');
      }
    };

    if (localSpot === 'redirected') {
      getToken();
    }
  }, [user.loggedIn]);

  useEffect(() => {
    const getSpotifyUser = async () => {
      const spotifyUser = await post('/user', {
        token: user.spotify.accessToken,
      });
      setUser((prevState: IUser) => ({
        ...prevState,
        spotify: {
          ...prevState.spotify,
          profile: {
            image: spotifyUser.images[0].url,
            name: spotifyUser.display_name,
            id: spotifyUser.id,
          },
        },
      }));
    };

    if (user.spotify.accessToken) {
      getSpotifyUser();
    }
  }, [user.spotify.accessToken]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
