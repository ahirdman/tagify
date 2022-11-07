import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Playlist } from '../../../store/playlists/playlists.interface';
import './TagSpotlight.scss';

interface IProps {
  list: Playlist;
}

const TagSpotlight = ({ list }: IProps) => {
  const navigate = useNavigate();

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
          <p className="p">tracks: 42</p>
          <p className="p">length: 6:43</p>
        </div>
      </div>
    </li>
  );
};

export default TagSpotlight;
