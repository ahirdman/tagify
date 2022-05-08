import * as React from 'react';
import { Link } from 'react-router-dom';
import Player from '../Player';
import Tag from '../../assets/tag.svg';
import List from '../../assets/list.svg';
import SignOut from '../../assets/sign-out.svg';
import './Navbar.scss';

interface INavbarProps {
  accessToken: any;
  user: any;
}

const Navbar = ({ accessToken, user }: INavbarProps) => {
  return (
    <nav className="navbar">
      <section className="navbar__row">
        <img
          src={user.image}
          alt="profile"
          className="navbar__row--avatar navbar__row--icon"
        />
        <p>{user.name}</p>
      </section>
      <Link to="/" className="navbar__row">
        <img src={Tag} alt="tag" className="navbar__row--icon" />
        Tag Tracks
      </Link>
      <Link to="/lists" className="navbar__row">
        <img src={List} alt="list" className="navbar__row--icon" />
        My Mood Lists
      </Link>
      <section className="navbar__row">
        <img src={SignOut} alt="sign out" className="navbar__row--icon" />
        <p>Sign Out</p>
      </section>
      <Player accessToken={accessToken} />
    </nav>
  );
};

export default Navbar;
