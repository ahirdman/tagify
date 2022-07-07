import { useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import './App.scss';
import Navbar from './Components/organisms/Navbar/Navbar';
import Login from './Pages/login/Login';
import Tracks from './Pages/tracks/Tracks';
import Lists from './Pages/lists/Lists';
import { UserContext } from './utils/hooks/UserContext';

const App = () => {
  const [deviceId, setDeviceId] = useState('');

  const user = useContext(UserContext);

  return (
    <>
      {user.loggedIn && user.spotify.accessToken ? (
        <main className="app">
          <Navbar setDeviceId={setDeviceId} />
          <Routes>
            <Route path="/" element={<Tracks deviceId={deviceId} />} />
            <Route path="/lists" element={<Lists />} />
          </Routes>
        </main>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
