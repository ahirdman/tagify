import * as React from 'react';
import { ISavedTrack } from '../../utils/interface';
import './SelectTrack.scss';

interface ISavedTracks {
  savedTracks: ISavedTrack[];
}

const SelectTrack = ({ savedTracks }: ISavedTracks) => {
  const formatTrack = (trackArr: ISavedTrack[]) =>
    trackArr.map((track: ISavedTrack) => ({
      artwork: track.track.album.images[2].url,
      title: track.track.name,
      artist: track.track.artists[0].name,
      id: track.added_at,
    }));

  return (
    <section className="select">
      <header className="select__title">Saved Tracks</header>
      <input type="text" className="select__search" />
      <section className="select__header">
        <p className="select__header--title">TITLE & ARTIST</p>
      </section>
      <ul className="track-list">
        {formatTrack(savedTracks).map(track => {
          return (
            <li key={track.id} className="track-list__row">
              <img
                src={track.artwork}
                alt="album"
                className="track-list__album"
              />
              <section className="track-list__details">
                <p className="track-list__details--title">{track.title}</p>
                <p className="track-list__details--artist">{track.artist}</p>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SelectTrack;
