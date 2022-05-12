import * as React from 'react';
import { useEffect, useState } from 'react';
import { playTrack } from '../../utils/modules/playerModules';
import { ISavedTrack } from '../../utils/interface';
import { onSnapshot } from 'firebase/firestore';
import { userDocRef } from '../../utils/firebase';
import { matchTag } from '../../utils/modules/db';
import AddTag from '../AddTag';
import UserTags from '../TrackTags';
import Note from '../../assets/music-note.svg';
import Play from '../../assets/playback/play-green.svg';
import './SelectedTrack.scss';

interface ISelectedTrackProps {
  selectedTrack?: ISavedTrack;
  deviceId?: string;
  accessToken: string;
}

const SelectedTrack = ({
  selectedTrack,
  deviceId,
  accessToken,
}: ISelectedTrackProps) => {
  const [trackTags, setTrackTags] = useState<string[]>();
  const [userTags, setUserTags] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(userDocRef, doc => {
      const tagObject = doc.data().tags;
      const tags = Object.keys(tagObject);
      setUserTags(tags);
      if (selectedTrack) {
        const matches = matchTag(tagObject, selectedTrack.uri);
        setTrackTags(matches);
      }
    });

    return () => {
      unsub();
      console.log('unsubscribed');
    };
  }, [selectedTrack]);

  return (
    <fieldset className="track-card">
      <legend className="track-card__title">Selected</legend>
      {selectedTrack ? (
        <>
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
                  accessToken,
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
              <p className="track-card__text--album">
                {selectedTrack.album.name}
              </p>
            </section>
          </section>
          <AddTag uri={selectedTrack.uri} userTags={userTags} />
          <UserTags uri={selectedTrack.uri} trackTags={trackTags} />
        </>
      ) : (
        <section className="track-card__empty">
          <img src={Note} alt="cross" className="track-card__empty--icon" />
          <p className="track-card__empty--text">select a track</p>
        </section>
      )}
    </fieldset>
  );
};

export default SelectedTrack;
