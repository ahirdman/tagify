import * as React from 'react';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../utils/hooks/window';
import { IWindow } from '../../../utils/interface';
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
  const size: IWindow = useWindowSize();

  if (size.width > 600) {
    return (
      <nav className="navbar">
        <div className="navbar__settings">
          <img src={user.image} alt="profile" className="navbar__settings--avatar" />
          <p>{user.name}</p>
        </div>

        <div className="navbar__links">
          <Link to="/" className="navbar__links--tracks">
            Tag Tracks
          </Link>

          <Link to="/lists" className="navbar__links--list">
            My Mood Lists
          </Link>
        </div>

        <Player accessToken={accessToken} setDeviceId={setDeviceId} />
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__links--tracks">
        <img src={Tag} alt="tag" className="navbar__row--icon" />
      </Link>

      <Link to="/lists" className="navbar__links--list">
        <img src={List} alt="list" className="navbar__row--icon" />
      </Link>

      <div className="navbar__settings">
        <img src={user.image} alt="profile" className="navbar__settings--avatar" />
      </div>
      {/* <Player accessToken={accessToken} setDeviceId={setDeviceId} /> */}
    </nav>
  );
};

export default Navbar;
