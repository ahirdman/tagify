import { eraseCookie, findCookie } from './utils/modules/modules';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IUser, ISavedObject } from './utils/interface';
import * as React from 'react';
import { post } from './utils/httpClient';
import Note from './assets/music-note.svg';
import List from './assets/list.svg';
import './App.scss';
import Navbar from './Components/organisms/Navbar/Navbar';
import SelectTrack from './Components/organisms/SavedTracks/SavedTracks';
import SelectedTrack from './Components/organisms/SelectedTrack/SelectedTrack';
import SelectList from './Components/organisms/SelectList/SelectList';
import EditList from './Components/organisms/EditList/EditList';
import Login from './Pages/login/Login';
import EmptyCard from './Components/organisms/EmptyCard/EmptyCard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [savedTracks, setSavedTracks] = useState<ISavedObject[]>();
  const [selectedTrack, setSelectedTrack] = useState();
  const [selectedList, setSelectedList] = useState();
  const [user, setUser] = useState<IUser>({
    name: '',
    image: '',
    id: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const user = await post('/user', { token: accessToken });
      setUser({
        name: user.display_name,
        image: user.images[0].url,
        id: user.id,
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
        <Navbar accessToken={accessToken} user={user} setDeviceId={setDeviceId} />
        <Routes>
          <Route
            path="/"
            element={
              <section className="app__view">
                {savedTracks && (
                  <>
                    <SelectTrack savedTracks={savedTracks} setSelectedTrack={setSelectedTrack} />
                    {selectedTrack ? (
                      <SelectedTrack selectedTrack={selectedTrack} deviceId={deviceId} accessToken={accessToken} />
                    ) : (
                      <EmptyCard icon={Note} item="track" />
                    )}
                  </>
                )}
              </section>
            }
          />
          <Route
            path="/lists"
            element={
              <section className="app__view">
                <SelectList setSelectedList={setSelectedList} />
                {selectedList ? (
                  <EditList selectedList={selectedList} id={user.id} accessToken={accessToken} />
                ) : (
                  <EmptyCard icon={List} item="list" />
                )}
              </section>
            }
          />
        </Routes>
      </main>
    );
  }
};

export default App;
