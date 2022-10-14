import * as React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { Playlist } from '../../../store/playlists/playlists.interface';
import { setSelectedList } from '../../../store/playlists/playlists.slice';
import './PLaylistRow.scss';

interface IProps {
  list: Playlist;
}

const PlaylistRow = ({ list }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <li
      onClick={() => {
        dispatch(setSelectedList({ selectedList: list.id }));
      }}
      className="playlist-row"
    >
      <section className="playlist-row__details">
        <div className="playlist-row__details--circle" style={{ background: list.color }}></div>
        <p className="playlist-row__details--title">{list.name}</p>
      </section>
    </li>
  );
};

export default PlaylistRow;
