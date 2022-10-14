import * as React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectTagPlaylists } from '../../../store/playlists/playlists.slice';
import { PlaylistRow } from '../../molecules';
import './Taglist.scss';

const Taglist = () => {
  const taglists = useAppSelector(selectTagPlaylists);

  return (
    <ul className="taglist">
      {taglists.map((list, index) => {
        return <PlaylistRow key={index} list={list} />;
      })}
    </ul>
  );
};

export default Taglist;
