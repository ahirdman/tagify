import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import './App.scss';
import Navbar from './Components/organisms/Navbar/Navbar';
import Login from './Pages/login/Login';
import Tracks from './Pages/tracks/Tracks';
import Lists from './Pages/lists/Lists';
import { UserContext } from './context/UserContext';
import * as SavedReducer from './reducers/savedTracks/savedTracks.reducer';

const App = () => {
  const [deviceId, setDeviceId] = React.useState('');
  const [state, dispatch] = React.useReducer(
    SavedReducer.savedTracksReducer,
    SavedReducer.initialTracksState
  );

  const user = React.useContext(UserContext);

  return (
    <>
      {user.loggedIn && user.spotify.accessToken ? (
        <main className="app">
          <Navbar setDeviceId={setDeviceId} />
          <Routes>
            <Route
              path="/"
              element={
                <Tracks deviceId={deviceId} state={state} dispatch={dispatch} />
              }
            />
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
