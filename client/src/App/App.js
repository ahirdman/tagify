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
    <section className="App">
      <header className="header">Welcome to Tinderify!</header>
      <main className="main-wrapper">
        {!loggedIn && (
          <button onClick={handleLogIn} className="login-button">
            Log In!
          </button>
        )}
        {loggedIn && (
          <>
            <Profile accessToken={accessToken} />
            <Player accessToken={accessToken} />
          </>
        )}
      </main>
      <footer className="footer">By Alexander Hirdman</footer>
    </section>
  );
};

export default App;
