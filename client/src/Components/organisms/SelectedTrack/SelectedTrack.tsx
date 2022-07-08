import * as React from 'react';
import { playTrack } from '../../../utils/modules/playerModules';
import { ISavedTrack, ITags } from '../../../utils/interface';
import { onSnapshot } from 'firebase/firestore';
import * as Firestore from '../../../utils/firebase/firestore';
import { matchTag } from '../../../utils/modules/db';
import AddTag from '../../molecules/AddTag/AddTag';
import TrackTags from '../../molecules/TrackTags/TrackTags';
import Play from '../../../assets/playback/play-green.svg';
import './SelectedTrack.scss';
import CardNav from '../../molecules/CardNav/CardNav';
import UserTags from '../../molecules/UserTags/UserTags';
import { UserContext } from '../../../utils/hooks/UserContext';

interface ISelectedTrackProps {
  selectedTrack?: ISavedTrack;
  deviceId?: string;
  setSelectedTrack?: any;
}

const SelectedTrack = ({
  selectedTrack,
  deviceId,
  setSelectedTrack,
}: ISelectedTrackProps) => {
  const [trackTags, setTrackTags] = React.useState<string[]>([]);
  const [userTags, setUserTags] = React.useState([]);

  const user = React.useContext(UserContext);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      Firestore.tagCol(user.fireId),
      collection => {
        const tags: ITags[] = [];
        const tagObject: any[] = [];

        collection.forEach(doc => {
          const data = doc.data();
          tags.push({ name: data.name, color: data.color });
          tagObject.push({
            color: data.color,
            [data.name]: [...data.tracks],
          });
        });
        setUserTags(tags);
        if (selectedTrack) {
          const matches = matchTag(tagObject, selectedTrack.uri);
          setTrackTags(matches);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [selectedTrack, user.fireId]);

  return (
    <div className="track-card">
      <CardNav
        title="Selected Track"
        onClick={() => setSelectedTrack(undefined)}
      />
      <section className="track-card__info">
        <img
          src={selectedTrack.album.images[1].url}
          alt="album"
          className="track-card__album"
        />
        <img
          onClick={() =>
            playTrack(
              deviceId,
              user.spotify.accessToken,
              selectedTrack.album.uri,
              selectedTrack.track_number - 1
            )
          }
          src={Play}
          alt="playback"
          className="track-card__playback"
        />
        <section className="track-card__text">
          <p className="track-card__text--title">{selectedTrack.name}</p>
          <p className="track-card__text--artist">
            {selectedTrack.artists[0].name}
          </p>
          <p className="track-card__text--album">{selectedTrack.album.name}</p>
        </section>
      </section>
      <TrackTags selectedTrack={selectedTrack} trackTags={trackTags} />
      <UserTags selectedTrack={selectedTrack} userTags={userTags} />
      <AddTag selectedTrack={selectedTrack} />
    </div>
  );
};

export default SelectedTrack;
