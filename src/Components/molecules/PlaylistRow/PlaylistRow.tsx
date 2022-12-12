import { Link } from 'react-router-dom';
import { IPlaylist } from '../../../store/playlists/playlists.interface';
import './PLaylistRow.scss';

interface IProps {
  list: IPlaylist;
}

const PlaylistRow = ({ list }: IProps) => {
  return (
    <Link to={list.id}>
      <li className="playlist-row">
        <div className="playlist-row__details">
          <div className="playlist-row__details--circle" style={{ background: list.color }}></div>
          <p className="playlist-row__details--title">{list.name}</p>
        </div>
      </li>
    </Link>
  );
};

export default PlaylistRow;
