import * as React from 'react';
import { onSnapshot } from 'firebase/firestore';
import './EditList.scss';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { CardNav, PlaylistController } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setSelectedList, setTracks } from '../../../store/playlists/playlists.slice';
import { TracksList } from '..';
import { SavedTracksData } from '../../../services';

const EditList = () => {
  const { tracks, selectedList } = useAppSelector(state => state.playlist);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  React.useEffect(() => {
    const unSubscirbe = onSnapshot(Firestore.tagDoc(user.fireId, selectedList), doc => {
      const tracks: SavedTracksData[] = doc.data().tracks;
      dispatch(setTracks({ tracks }));
    });

    return () => {
      unSubscirbe();
    };
  }, [selectedList, user.fireId, dispatch]);

  return (
    <div className="edit-list">
      <CardNav
        title={selectedList}
        onClick={() => dispatch(setSelectedList({ selectedList: null }))}
      />
      <PlaylistController tracks={tracks} />
      <section className="edit-list__header"></section>
      <TracksList tracks={tracks} />
    </div>
  );
};

export default EditList;
