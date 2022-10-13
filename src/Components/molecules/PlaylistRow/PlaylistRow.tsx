import * as React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { Playlist } from '../../../store/playlists/playlists.interface';
import { setSelectedList } from '../../../store/playlists/playlists.slice';

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
      className="select-list__row"
    >
      <section className="select-list__details">
        <div className="select-list__details--circle" style={{ background: list.color }}></div>
        <p className="select-list__details--title">{list.name}</p>
      </section>
    </li>
  );
};

export default PlaylistRow;
