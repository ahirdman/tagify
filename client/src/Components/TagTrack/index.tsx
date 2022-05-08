import * as React from 'react';
import './TagTrack.scss';
import Note from '../../assets/music-note.svg';
import { ISavedTrack } from '../../utils/interface';
import Play from '../../assets/playback/play-green.svg';
import Add from '../../assets/add.svg';
import { playTrack } from '../../utils/modules/playerModules';

interface ITagTrackProps {
  selectedTrack?: ISavedTrack;
  deviceId?: any;
  accessToken: string;
}

const TagTrack = ({ selectedTrack, deviceId, accessToken }: ITagTrackProps) => {
  return (
    <section className="track-card">
      <p className="track-card__title">Selected</p>
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
          <section className="add-tag">
            <section className="add-tag__search">
              <input className="add-tag__search--input" type="text" />
              <button className="add-tag__search--button">
                <img src={Add} alt="check" />
              </button>
            </section>
            <section className="add-tag__user-tags">Tag</section>
          </section>
          <section className="user-tags">All Tags</section>
        </>
      ) : (
        <section className="track-card__empty">
          <img src={Note} alt="cross" className="track-card__empty--icon" />
          <p className="track-card__empty--text">select a track</p>
        </section>
      )}
    </section>
  );
};

export default TagTrack;
