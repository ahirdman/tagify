import {
  eraseCookie,
  findCookie,
  handleLogIn,
} from '../../utils/modules/modules';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Navbar from '../Navbar';
import './App.scss';
import SelectTrack from '../SelectTrack';
import TagTrack from '../TagTrack';
import { IUser, ISavedTrack } from '../../utils/interface';
import { post } from '../../utils/httpClient';
import SelectList from '../SelectList';
import EditList from '../EditList';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [savedTracks, setSavedTracks] = useState<ISavedTrack[]>();
  const [user, setUser] = useState<IUser>({
    name: '',
    image: '',
  });

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

  useEffect(() => {
    getUser();
    getTracks();
  }, [accessToken]);

  useEffect(() => {
    if (document.cookie) {
      const accessCookie = findCookie('access');
      setLoggedIn(true);
      setAccessToken(accessCookie);
      eraseCookie('access');
    }
  }, []);

  if (!loggedIn) {
    return (
      <main className="app">
        <header className="header">TINDERIFY</header>
        <button onClick={handleLogIn} className="login-button">
          Login
        </button>
      </main>
    );
  } else {
    return (
      <main className="app">
        <Navbar accessToken={accessToken} user={user} />
        <Routes>
          <Route
            path="/"
            element={
              <section className="main-view">
                {savedTracks && (
                  <>
                    <SelectTrack savedTracks={savedTracks} />
                    <TagTrack />
                  </>
                )}
              </section>
            }
          />
          <Route
            path="/lists"
            element={
              <section className="main-view">
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
