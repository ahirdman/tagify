import * as React from 'react';
import { Link } from 'react-router-dom';
import Player from '../../molecules/Player/Player';
import Tag from '../../../assets/tag.svg';
import List from '../../../assets/list-white.svg';
import './Navbar.scss';

interface INavbarProps {
  accessToken: any;
  user: any;
  setDeviceId: any;
}

const Navbar = ({ accessToken, user, setDeviceId }: INavbarProps) => {
  return (
    <nav className="navbar">
      <section className="menu">
        <section className="menu__row">
          <img src={user.image} alt="profile" className="menu__row--avatar menu__row--icon" />
          <p className="menu__row--user">{user.name}</p>
        </section>
        <Link to="/" className="menu__row">
          <img src={Tag} alt="tag" className="menu__row--icon" />
          Tag Tracks
        </Link>
        <Link to="/lists" className="menu__row">
          <img src={List} alt="list" className="menu__row--icon" />
          My Mood Lists
        </Link>
      </section>
      <Player accessToken={accessToken} setDeviceId={setDeviceId} />
    </nav>
  );
};

export default Navbar;
