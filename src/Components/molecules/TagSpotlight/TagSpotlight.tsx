import * as React from 'react';
import { Playlist } from '../../../store/playlists/playlists.interface';
import './TagSpotlight.scss';

interface IProps {
  list: Playlist;
}

const TagSpotlight = ({ list }: IProps) => {
  return (
    <div className="tag-spotlight">
      <div className="tag-spotlight__circle" style={{ background: list.color }}></div>
      <div className="tag-spotlight__info">
        <div className="tag-spotlight__info--left">
          <p>{list.name}</p>
          <p>Status: Synced</p>
        </div>
        <div className="tag-spotlight__info--right">
          <p>tracks: 42</p>
          <p>length: 6:43</p>
        </div>
      </div>
    </div>
  );
};

export default TagSpotlight;
