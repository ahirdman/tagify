import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import { onSnapshot } from 'firebase/firestore';
import './EditList.scss';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import Send from '../../../assets/send.svg';
import { CardNav } from '../../molecules';
import { IFirestoreTrack } from '../../../services/firebase/firestore/firestore.interface';
import { Spotify } from '../../../services';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  selectedList: string;
  setSelectedList?: any;
}

const EditList = ({ selectedList, setSelectedList }: Props) => {
  const [tracks, setTracks] = React.useState([]);

  const user = useAppSelector(state => state.user);

  React.useEffect(() => {
    const unsub = onSnapshot(Firestore.tagDoc(user.fireId, selectedList), doc => {
      const tracks: IFirestoreTrack[] = doc.data().tracks;
      setTracks(tracks);
    });

    return () => {
      unsub();
    };
  }, [selectedList, user.fireId]);

  return (
    <div className="edit-list">
      <CardNav title={selectedList} onClick={() => setSelectedList(undefined)} />
      <form className="edit-list__search">
        <input type="text" className="edit-list__search--input" />
        <img src={Magnifier} alt="search" className="edit-list__search--icon" />
        <button
          className="edit-list__export"
          onClick={e => {
            e.preventDefault();
            Spotify.createNewPlaylistWithTracks(
              selectedList,
              user.spotify.token,
              user.spotify.profile.id,
              tracks
            );
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
