import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import { onSnapshot } from 'firebase/firestore';
import './EditList.scss';
import * as Firestore from '../../../utils/firebase/firestore';
import { IDbTrack } from '../../../utils/interface';
import Send from '../../../assets/send.svg';
import { post } from '../../../utils/httpClient';
import CardNav from '../../molecules/CardNav/CardNav';
import { UserContext } from '../../../utils/hooks/UserContext';

interface IEditListProps {
  selectedList: string;
  id: string;
  accessToken: string;
  setSelectedList?: any;
}

const EditList = ({
  selectedList,
  id,
  accessToken,
  setSelectedList,
}: IEditListProps) => {
  const [tracks, setTracks] = React.useState([]);

  const user = React.useContext(UserContext);

  const trackUris = (arr: IDbTrack[]) =>
    arr.map((track: IDbTrack) => track.uri);

  const savePlaylist = async (name: string) => {
    const playlist = await post('/playlist', {
      token: accessToken,
      userId: id,
      name,
    });
    await post('/playlist/add', {
      token: accessToken,
      playlistId: playlist.id,
      tracks: trackUris(tracks),
    });
  };

  React.useEffect(() => {
    const unsub = onSnapshot(
      Firestore.tagDoc(user.fireId, selectedList),
      doc => {
        const tracks = doc.data().tracks;
        setTracks(tracks);
      }
    );

    return () => {
      unsub();
    };
  }, [selectedList, user.fireId]);

  return (
    <div className="edit-list">
      <CardNav
        title={selectedList}
        onClick={() => setSelectedList(undefined)}
      />
      <form className="edit-list__search">
        <input type="text" className="edit-list__search--input" />
        <img src={Magnifier} alt="search" className="edit-list__search--icon" />
        <button
          className="edit-list__export"
          onClick={e => {
            e.preventDefault();
            savePlaylist(selectedList);
          }}
        >
          <img src={Send} alt="send" className="edit-list__export--icon" />
        </button>
      </form>
      <section className="edit-list__header">
        <p className="edit-list__header--title">TRACKS</p>
      </section>
      <ul className="tracks">
        {tracks.map((track: IDbTrack, index) => {
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
