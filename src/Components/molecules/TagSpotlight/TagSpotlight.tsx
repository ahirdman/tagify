import { useNavigate } from 'react-router-dom';
import { IPlaylist } from '../../../store/playlists/playlists.interface';
import { lengthOfPlaylist } from '../PlaylistController/PlaylistController';
import './TagSpotlight.scss';

interface IProps {
  list: IPlaylist;
}

const TagSpotlight = ({ list }: IProps) => {
  const navigate = useNavigate();

  const listLength = lengthOfPlaylist(list.tracks);

  return (
    <li
      className="tag-spotlight"
      onClick={() => {
        navigate(`/lists/${list.id}`);
      }}
    >
      <div className="tag-spotlight__circle" style={{ background: list.color }}></div>
      <div className="tag-spotlight__info">
        <div className="tag-spotlight__info--left">
          <h2 className="h2">{list.name}</h2>
          <p className="p">Status: {list.status.sync}</p>
        </div>
        <div className="tag-spotlight__info--right">
          <p className="p">tracks: {list.tracks.length}</p>
          <p className="p">length: {listLength} m</p>
        </div>
      </div>
    </li>
  );
};

export default TagSpotlight;
