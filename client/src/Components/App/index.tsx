import { eraseCookie, findCookie } from '../../utils/modules/modules';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Navbar from '../Navbar';
import './App.scss';
import SelectTrack from '../SavedTracks';
import SelectedTrack from '../SelectedTrack';
import { IUser, ISavedObject } from '../../utils/interface';
import { post } from '../../utils/httpClient';
import SelectList from '../SelectList';
import EditList from '../EditList';
import Login from '../Login';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [savedTracks, setSavedTracks] = useState<ISavedObject[]>();
  const [selectedTrack, setSelectedTrack] = useState();
  const [user, setUser] = useState<IUser>({
    name: '',
    image: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await post('/user', { token: accessToken });
      setUser({
        name: user.display_name,
        image: user.images[0].url,
      });
    };

    const getTracks = async () => {
      const savedTracks = await post('/user/saved', { token: accessToken });
      setSavedTracks(savedTracks.items);
    };

    if (document.cookie) {
      const accessCookie = findCookie('access');
      setAccessToken(accessCookie);
      eraseCookie('access');
      setLoggedIn(true);
    }

    if (accessToken) {
      getUser();
      getTracks();
    }
  }, [accessToken]);

  if (!loggedIn) {
    return <Login />;
  } else {
    return (
      <main className="app">
        <Navbar
          accessToken={accessToken}
          user={user}
          setDeviceId={setDeviceId}
        />
        <Routes>
          <Route
            path="/"
            element={
              <section className="app__view">
                {savedTracks && (
                  <>
                    <SelectTrack
                      savedTracks={savedTracks}
                      setSelectedTrack={setSelectedTrack}
                    />
                    <SelectedTrack
                      selectedTrack={selectedTrack}
                      deviceId={deviceId}
                      accessToken={accessToken}
                    />
                  </>
                )}
              </section>
            }
          />
          <Route
            path="/lists"
            element={
              <section className="app__view">
                <SelectList />
                <EditList />
              </section>
            }
          />
        </Routes>
      </main>
    );
  }
};

export default App;
