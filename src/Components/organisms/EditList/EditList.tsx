import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import { onSnapshot } from 'firebase/firestore';
import './EditList.scss';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import Send from '../../../assets/send.svg';
import { CardNav, SearchBar } from '../../molecules';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  createPlaylist,
  setSelectedList,
  setTracks,
} from '../../../store/playlists/playlists.slice';
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
      <SearchBar icon={Magnifier} />
      <button
        className="edit-list__export"
        onClick={e => {
          e.preventDefault();
          dispatch(createPlaylist());
        }}
      >
        <img src={Send} alt="send" className="edit-list__export--icon" />
      </button>
      <section className="edit-list__header">
        <p className="edit-list__header--title">TRACKS</p>
      </section>
      <TracksList tracks={tracks} />
    </div>
  );
};

export default EditList;
