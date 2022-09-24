import * as React from 'react';
import { onSnapshot } from 'firebase/firestore';
import * as Firestore from '../../../services/firebase/firestore/firestore.service';
import { AddTag, TrackTags, CardNav, UserTags } from '../../molecules';
import Play from '../../../assets/playback/play-green.svg';
import './SelectedTrack.scss';
import { matchTag } from '../../../services/firebase/firestore/firestore.helper';
import { ITags } from '../../../common/common.interface';
import { Spotify } from '../../../services';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectedTrackSelector,
  setSelectedTrack,
} from '../../../store/savedTracks/savedTracks.slice';

const SelectedTrack = () => {
  const [trackTags, setTrackTags] = React.useState<string[]>([]);
  const [userTags, setUserTags] = React.useState([]);

  const deviceId = useAppSelector(state => state.playback.deviceID);
  const user = useAppSelector(state => state.user);
  const selectedTrack = useAppSelector(selectedTrackSelector);
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    const unsubscribe = onSnapshot(Firestore.tagCol(user.fireId), collection => {
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
    });

    return () => {
      unsubscribe();
    };
  }, [selectedTrack, user.fireId]);

  return (
    <div className="track-card">
      <CardNav title="Selected Track" onClick={() => dispatch(setSelectedTrack(undefined))} />
      <section className="track-card__info">
        <img src={selectedTrack.artworkMedium} alt="album" className="track-card__album" />
        <img
          onClick={() => {
            Spotify.playTrack(deviceId, user.spotify.token, selectedTrack.uri);
          }}
          src={Play}
          alt="playback"
          className="track-card__playback"
        />
        <section className="track-card__text">
          <p className="track-card__text--title">{selectedTrack.name}</p>
          <p className="track-card__text--artist">{selectedTrack.artist}</p>
          <p className="track-card__text--album">{selectedTrack.album}</p>
        </section>
      </section>
      <TrackTags trackTags={trackTags} />
      <UserTags userTags={userTags} />
      <AddTag />
    </div>
  );
};

export default SelectedTrack;
