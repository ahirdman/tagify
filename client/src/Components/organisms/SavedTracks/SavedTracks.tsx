import * as React from 'react';
import { ISavedObject } from '../../../utils/interface';
import Magnifier from '../../../assets/magnifier.svg';
import './SelectTrack.scss';

interface ISavedTracks {
  savedTracks: ISavedObject[];
  setSelectedTrack: any;
}

const SelectTrack = ({ savedTracks, setSelectedTrack }: ISavedTracks) => {
  return (
    <section className="select">
      <h2 className="select__title">Saved Tracks</h2>
      <form className="select__search">
        <input type="text" className="select__search--input" />
        <img src={Magnifier} alt="search" className="select__search--icon" />
      </form>
      <section className="select__header">
        <p className="select__header--title">TITLE & ARTIST</p>
      </section>
      <ul className="track-list">
        {savedTracks.map((track, index) => {
          return (
            <li onClick={() => setSelectedTrack(track.track)} key={index} className="track-list__row">
              <img src={track.track.album.images[2].url} alt="album" className="track-list__album" />
              <section className="track-list__details">
                <p className="track-list__details--title">{track.track.name}</p>
                <p className="track-list__details--artist">{track.track.artists[0].name}</p>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SelectTrack;
