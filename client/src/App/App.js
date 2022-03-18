import { eraseCookie, handleLogIn, findCookie } from "./modules.js";
import { useEffect, useState } from 'react';
import { Player } from '../Player/Player';
import { Profile } from '../Profile/Profile';
import LoginSVG from '../assets/login.svg'
import './App.scss';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if (document.cookie) {
      const accessCookie = findCookie('access')
      setLoggedIn(true);
      setAccessToken(accessCookie);
      eraseCookie('access');
    }
  }, []);

  return (
    <>
        {!loggedIn && (
      <main className="login-wrapper">
        <header className="header">TINDERIFY</header>
        <button onClick={handleLogIn} className="login-button">
            <img className='login-button--icon' src={LoginSVG} alt='' />
            Login
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
