import * as React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectMixedPlaylists } from '../../../store/playlists/playlists.slice';
import PlaylistRow from '../../molecules/PlaylistRow/PlaylistRow';

const MixedList = () => {
  const mixedPlaylists = useAppSelector(selectMixedPlaylists);

  return (
    <ul>
      {mixedPlaylists.map((list, index) => {
        return <PlaylistRow list={list} key={index} />;
      })}
    </ul>
  );
};

export default MixedList;
