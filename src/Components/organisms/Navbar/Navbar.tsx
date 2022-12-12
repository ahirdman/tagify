import { NavLink } from 'react-router-dom';
import { Player } from '../../molecules';
import { useAppSelector } from '../../../store/hooks';
import { Tag, Settings, Library, Home } from './Navbar.svg';
import './Navbar.scss';

const Navbar = () => {
  const profile = useAppSelector(state => state.user.spotify.profile);

  return (
    <nav className="navbar">
      <NavLink to="/home" className="navbar__item">
        <Home className="navbar__item--icon" />
      </NavLink>

      <NavLink to="/tracks" className="navbar__item">
        <Library className="navbar__item--icon" />
        <h1 className="navbar__item--text">Tag Tracks</h1>
      </NavLink>

      <NavLink to="/lists" className="navbar__item-">
        <Tag className="navbar__item--icon" />
        <h1 className="navbar__item--text">My Mood Lists</h1>
      </NavLink>

      <NavLink to="/settings" className="navbar__item">
        <Settings className="navbar__item--icon" />
        <img src={profile.image} alt="profile" className="navbar__item--profile-picture" />
        <p className="navbar__item--text">{profile.name}</p>
      </NavLink>

      <Player />
    </nav>
  );
};

export default Navbar;
