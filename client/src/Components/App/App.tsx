import { eraseCookie, findCookie } from '../../utils/modules/modules';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import './App.scss';
import SelectTrack from '../SavedTracks/SavedTracks';
import SelectedTrack from '../SelectedTrack/SelectedTrack';
import { IUser, ISavedObject } from '../../utils/interface';
import { post } from '../../utils/httpClient';
import SelectList from '../SelectList/SelectList';
import EditList from '../EditList/EditList';
import Login from '../Login/Login';
import EmptyCard from '../EmptyCard/EmptyCard';
import List from '../../assets/list.svg';
import Note from '../../assets/music-note.svg';

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
                    {selectedTrack ? (
                      <SelectedTrack
                        selectedTrack={selectedTrack}
                        deviceId={deviceId}
                        accessToken={accessToken}
                      />
                    ) : (
                      <EmptyCard icon={Note} />
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
                  <EditList selectedList={selectedList} id={user.id} />
                ) : (
                  <EmptyCard icon={List} />
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
