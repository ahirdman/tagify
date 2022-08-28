import * as React from 'react';
import { ISavedTrack } from '../../../services/spotify/spotify.interface';
import { onSnapshot } from 'firebase/firestore';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { AddTag, TrackTags, CardNav, UserTags } from '../../molecules';
import Play from '../../../assets/playback/play-green.svg';
import './SelectedTrack.scss';
import { UserContext } from '../../../context/UserContext';
import { matchTag } from '../../../services/firebase/firestore/firestore.helper';
import { ITags } from '../../../common/common.types';
import { Spotify } from '../../../services';
import { useAppSelector } from '../../../store/hooks';

interface ISelectedTrackProps {
  selectedTrack: ISavedTrack;
  setSelectedTrack?: any;
}

const SelectedTrack = ({
  selectedTrack,
  setSelectedTrack,
}: ISelectedTrackProps) => {
  const [trackTags, setTrackTags] = React.useState<string[]>([]);
  const [userTags, setUserTags] = React.useState([]);

  const deviceId = useAppSelector(state => state.playback.deviceID);

  const user = React.useContext(UserContext);

  React.useLayoutEffect(() => {
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
        const matches = matchTag(tagObject, selectedTrack.uri);
        setTrackTags(matches);
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
          onClick={() => {
            Spotify.playTrack(
              deviceId,
              user.spotify.accessToken,
              selectedTrack.uri
            );
          }}
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
