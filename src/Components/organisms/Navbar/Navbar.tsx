import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Player from '../../molecules/Player/Player';
import Tag from '../../../assets/tag.svg';
import List from '../../../assets/list-white.svg';
import Avatar from '../../../assets/avatar.svg';
import './Navbar.scss';
import { logOut } from '../../../utils/firebase/auth';
import { UserContext } from '../../../utils/context/UserContext';

interface INavbarProps {
  setDeviceId: any;
}

const Navbar = ({ setDeviceId }: INavbarProps) => {
  const user = React.useContext(UserContext);

  return (
    <nav className="navbar">
      <div className="navbar__item navbar__profile">
        <img
          src={Avatar}
          alt="profile"
          className="navbar__item--icon navbar__item--mobile"
          onClick={() => logOut()}
        />
        <img
          src={user.spotify.profile.image}
          alt="profile"
          className="navbar__item--avatar navbar__item--desktop"
          onClick={() => logOut()}
        />
        <p className="navbar__item--username navbar__item--desktop">
          {user.spotify.profile.name}
        </p>
      </div>

      <div className="navbar__item navbar__item--desktop">
        <NavLink to="/" className="navbar__item--tracks">
          <img src={Tag} alt="tag" className="navbar__item--icon" />
          <h1 className="navbar__item--text">Tag Tracks</h1>
        </NavLink>

        <NavLink to="/lists" className="navbar__item--list">
          <img src={List} alt="list" className="navbar__item--icon" />
          <h1 className="navbar__item--text">My Mood Lists</h1>
        </NavLink>
      </div>

      <div className="navbar__item navbar__item--mobile">
        <NavLink to="/" className="navbar__item--tracks">
          <img src={Tag} alt="tag" className="navbar__item--icon" />
        </NavLink>
      </div>

      <div className="navbar__item navbar__item--mobile">
        <NavLink to="/lists" className="navbar__item--list">
          <img src={List} alt="list" className="navbar__item--icon" />
        </NavLink>
      </div>

      <Player setDeviceId={setDeviceId} />
    </nav>
  );
};

export default Navbar;
