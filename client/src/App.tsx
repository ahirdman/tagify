import { handleLogIn } from './utils/modules/modules';
import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ISavedObject } from './utils/interface';
import * as React from 'react';
import { post } from './utils/httpClient';
import './App.scss';
import Navbar from './Components/organisms/Navbar/Navbar';
import { authObserver } from './utils/firebase/auth';
import Login from './Pages/login/Login';
import Tracks from './Pages/tracks/Tracks';
import Lists from './Pages/lists/Lists';
import { get } from './utils/httpClient';

export interface IUser {
  mail: string;
  loggedIn: boolean;
  spotify: {
    connected: boolean;
    profile: {
      image: string;
      name: string;
      id: string;
    };
    accessToken: string;
    deviceId: string;
  };
}

export const userObject = {
  mail: '',
  loggedIn: false,
  spotify: {
    connected: false,
    profile: {
      image: '',
      name: '',
      id: '',
    },
    accessToken: '',
    deviceId: '',
  },
};

const UserContext = React.createContext<IUser | null>(null);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [savedTracks, setSavedTracks] = useState([] as ISavedObject[]);
  const [selectedTrack, setSelectedTrack] = useState();
  const [selectedList, setSelectedList] = useState();
  const [user, setUser] = useState<IUser>(userObject);

  const user1 = useContext(UserContext);

  useEffect(() => {
    authObserver(setUser);
  }, []);

  useEffect(() => {
    const localFire = localStorage.getItem('auth');

    if (!localFire) return;

    const localSpot = localStorage.getItem('spot');

    if (!localSpot) {
      localStorage.setItem('spot', 'redirected');
      handleLogIn();
    }

    const getToken = async () => {
      try {
        const token = await get('/auth/token');

        setUser((prevState: IUser) => ({
          ...prevState,
          spotify: {
            ...prevState.spotify,
            connected: true,
            accessToken: token.access_token,
          },
        }));
      } catch (error) {
        console.log(error);
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

    const getTracks = async () => {
      const savedTracks = await post('/user/saved', {
        token: user.spotify.accessToken,
      });
      setSavedTracks(savedTracks.items);
    };

    if (user.spotify.accessToken) {
      getSpotifyUser();
      getTracks();
    }
  }, [user.spotify.accessToken]);

  return (
    <UserContext.Provider value={userObject}>
      {user.loggedIn ? (
        <main className="app">
          <Navbar
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            accessToken={accessToken}
            user={user}
            setDeviceId={setDeviceId}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Tracks
                  savedTracks={savedTracks}
                  selectedTrack={selectedTrack}
                  setSelectedTrack={setSelectedTrack}
                  deviceId={deviceId}
                  accessToken={accessToken}
                />
              }
            />
            <Route
              path="/lists"
              element={
                <Lists
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                  accessToken={accessToken}
                  user={user}
                />
              }
            />
          </Routes>
        </main>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </UserContext.Provider>
  );
};

export default App;
