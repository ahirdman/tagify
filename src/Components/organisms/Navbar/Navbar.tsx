import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Player } from '../../molecules';
import './Navbar.scss';
import { useAppSelector } from '../../../store/hooks';
import { Tag } from '../../../svg';
import { Settings } from '../../../svg';
import { Library } from '../../../svg';
import { Home } from '../../../svg';

const Navbar = () => {
  const profile = useAppSelector(state => state.user.spotify.profile);

  const location = useLocation().pathname;

  const isActiveLink = (path: string) =>
    location === path ? 'navbar__item--icon navbar__item--active' : 'navbar__item--icon';

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__item">
        <Home className={isActiveLink('/')} />
      </NavLink>

      <NavLink to="/tracks" className="navbar__item">
        <Library className={isActiveLink('/tracks')} />
        <h1 className="navbar__item--text">Tag Tracks</h1>
      </NavLink>

      <NavLink to="/lists" className="navbar__item-">
        <Tag className={isActiveLink('/lists')} />
        <h1 className="navbar__item--text">My Mood Lists</h1>
      </NavLink>

      <NavLink to="/account" className="navbar__item">
        <Settings className={isActiveLink('/account')} />
        <img src={profile.image} alt="profile" className="navbar__item--profile-picture" />
        <p className="navbar__item--text">{profile.name}</p>
      </NavLink>

      <Player />
    </nav>
  );
};

export default Navbar;
