import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import { onSnapshot } from 'firebase/firestore';
import './EditList.scss';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import Send from '../../../assets/send.svg';
import { CardNav } from '../../molecules';
import { IFirestoreTrack } from '../../../services/firebase/firestore/firestore.interface';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  createPlaylist,
  setSelectedList,
  setTracks,
} from '../../../store/playlists/playlists.slice';

const EditList = () => {
  const { tracks, selectedList } = useAppSelector(state => state.playlist);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  React.useEffect(() => {
    const unSubscirbe = onSnapshot(Firestore.tagDoc(user.fireId, selectedList), doc => {
      const tracks: IFirestoreTrack[] = doc.data().tracks;
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
      <form className="edit-list__search">
        <input type="text" className="edit-list__search--input" />
        <img src={Magnifier} alt="search" className="edit-list__search--icon" />
        <button
          className="edit-list__export"
          onClick={e => {
            e.preventDefault();
            dispatch(createPlaylist());
          }}
        >
          <img src={Send} alt="send" className="edit-list__export--icon" />
        </button>
      </form>
      <section className="edit-list__header">
        <p className="edit-list__header--title">TRACKS</p>
      </section>
      <ul className="tracks">
        {tracks.map((track: IFirestoreTrack, index) => {
          return (
            <li key={index} className="tracks__row">
              <img src={track.artwork} alt="album" className="tracks__album" />
              <section className="tracks__details">
                <p className="tracks__details--title">{track.title}</p>
                <p className="tracks__details--artist">{track.artist}</p>
              </section>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EditList;
