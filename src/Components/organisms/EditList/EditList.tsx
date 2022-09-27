import * as React from 'react';
import './EditList.scss';
import { CardNav, PlaylistController } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { clearSelectedList, setSelectedList } from '../../../store/playlists/playlists.slice';
import { TracksList } from '..';

const EditList = () => {
  const { tracks, name } = useAppSelector(state => state.playlist.selectedList);

  const dispatch = useAppDispatch();

  return (
    <div className="edit-list">
      <CardNav title={name} onClick={() => dispatch(clearSelectedList())} />
      <PlaylistController />
      <div className="edit-list__header"></div>
      <TracksList tracks={tracks} />
    </div>
  );
};

export default EditList;
