import * as React from 'react';
import { Link } from 'react-router-dom';
import Player from '../../molecules/Player/Player';
import Tag from '../../../assets/tag.svg';
import List from '../../../assets/list-white.svg';
import Avatar from '../../../assets/avatar.svg';
import './Navbar.scss';

interface INavbarProps {
  accessToken: string;
  user: any;
  setDeviceId: any;
}

const Navbar = ({ accessToken, user, setDeviceId }: INavbarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar__links">
        <img
          src={Avatar}
          alt="profile"
          className="navbar__links--icon navbar__links--mobile"
        />
        <img
          src={user.image}
          alt="profile"
          className="navbar__links--avatar navbar__links--desktop"
        />
        <p className="navbar__links--username navbar__links--desktop">
          {user.name}
        </p>
      </div>

      <div className="navbar__links">
        <Link to="/" className="navbar__links--tracks">
          <h1 className="navbar__links--desktop">Tag Tracks</h1>
          <img src={Tag} alt="tag" className="navbar__links--icon" />
        </Link>
      </div>

      <div className="navbar__links">
        <Link to="/lists" className="navbar__links--list">
          <h1 className="navbar__links--desktop">My Mood Lists</h1>
          <img src={List} alt="list" className="navbar__links--icon" />
        </Link>
      </div>

      <div className="navbar__player">
        <Player accessToken={accessToken} setDeviceId={setDeviceId} />
      </div>
    </nav>
  );
};

export default Navbar;
