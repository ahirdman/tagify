import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Player } from '../../molecules';
import './Navbar.scss';
import { useAppSelector } from '../../../store/hooks';
import Tag from '../../../svg/Tag';
import List from '../../../svg/List';
import Avatar from '../../../svg/Avatar';
import Heart from '../../../svg/Heart';
import Library from '../../../svg/Library';

const Navbar = () => {
  const profile = useAppSelector(state => state.user.spotify.profile);

  const location = useLocation().pathname;

  return (
    <nav className="navbar">
      <NavLink to="/account" className="navbar__item">
        <Avatar
          className={
            location === '/account'
              ? 'navbar__item--icon navbar__item--active'
              : 'navbar__item--icon'
          }
        />
        <img src={profile.image} alt="profile" className="navbar__item--profile-picture" />
        <p className="navbar__item--text">{profile.name}</p>
      </NavLink>

      <NavLink to="/" className="navbar__item">
        <Library
          className={
            location === '/' ? 'navbar__item--icon navbar__item--active' : 'navbar__item--icon'
          }
        />
        <h1 className="navbar__item--text">Tag Tracks</h1>
      </NavLink>

      <NavLink to="/lists" className="navbar__item-">
        <Tag
          className={
            location === '/lists' ? 'navbar__item--icon navbar__item--active' : 'navbar__item--icon'
          }
        />
        <h1 className="navbar__item--text">My Mood Lists</h1>
      </NavLink>

      <Player />
    </nav>
  );
};

export default Navbar;
