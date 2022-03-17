import './App.scss';
import React, { useEffect, useState } from 'react';
import { Player } from '../Player/Player';
import { Profile } from '../Profile/Profile';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const eraseCookie = name => {
    document.cookie = name + '=; Max-Age=-99999999;';
  };

  useEffect(() => {
    if (document.cookie) {
      const accCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('access='))
        .split('=')[1];

      setLoggedIn(true);
      setAccessToken(accCookie);
      eraseCookie('access');
    }
  }, []);

  const handleLogIn = () => {
    window.location.href = 'http://localhost:8080/login';
  };

  return (
    <>
        {!loggedIn && (
      <main className="login-wrapper">
        <header className="header">Welcome to Tinderify!</header>
        <button onClick={handleLogIn} className="login-button">
        Log In!
        </button>
      </main>
        )}
        {loggedIn && (
          <main className='player-wrapper'>
            <Profile accessToken={accessToken} />
            <Player accessToken={accessToken} />
          </main>
        )}
    </>
  );
};

export default App;
