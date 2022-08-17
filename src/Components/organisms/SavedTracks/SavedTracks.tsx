import * as React from 'react';
import { ISavedObject } from '../../../utils/interface';
import Magnifier from '../../../assets/magnifier.svg';
import './SelectTrack.scss';
import CardNav from '../../molecules/CardNav/CardNav';

interface ISavedTracks {
  savedTracks: ISavedObject[];
  fetchMoreTracks: any;
  setSelectedTrack: any;
  isFetching: boolean;
  setIsFetching: any;
}

const SelectTrack = ({
  savedTracks,
  setSelectedTrack,
  fetchMoreTracks,
  isFetching,
  setIsFetching,
}: ISavedTracks) => {
  React.useEffect(() => {
    const listEl = document.getElementById('tracks');
    const handleScroll = () => {
      if (listEl.scrollTop + listEl.clientHeight >= listEl.scrollHeight) {
        setIsFetching(true);
      }
    };

    listEl.addEventListener('scroll', handleScroll);
    return () => listEl.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (!isFetching) return;
    fetchMoreTracks();
  }, [isFetching]);

  return (
    <div className="select">
      <CardNav title="Saved Tracks" />
      <form className="select__search">
        <input type="text" className="select__search--input" />
        <img src={Magnifier} alt="search" className="select__search--icon" />
      </form>
      <section className="select__header">
        <p className="select__header--title">TITLE & ARTIST</p>
      </section>
      <ul className="track-list" id="tracks">
        {savedTracks.map((track, index) => {
          return (
            <li
              onClick={() => setSelectedTrack(track.track)}
              key={index}
              className="track-list__row"
            >
              <img
                src={track.track.album.images[2].url}
                alt="album"
                className="track-list__album"
              />
              <section className="track-list__details">
                <p className="track-list__details--title">{track.track.name}</p>
                <p className="track-list__details--artist">
                  {track.track.artists[0].name}
                </p>
              </section>
            </li>
          );
        })}
        {isFetching && <p>Fetching more tracks...</p>}
      </ul>
    </div>
  );
};

export default SelectTrack;
