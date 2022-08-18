import * as React from 'react';
import { ISavedObject } from '../../../utils/interface';
import Magnifier from '../../../assets/magnifier.svg';
import './SelectTrack.scss';
import CardNav from '../../molecules/CardNav/CardNav';
import useInfiniteScroll from '../../../utils/hooks/useInfiniteScroll';
import { UserContext } from '../../../utils/context/UserContext';
import { post } from '../../../utils/httpClient';

interface ISavedTracks {
  savedTracks: ISavedObject[];
  setSelectedTrack: any;
  setSavedTracks: any;
  nextUrl: string;
  setNextUrl: any;
}

const SelectTrack = ({
  savedTracks,
  setSavedTracks,
  setSelectedTrack,
  nextUrl,
  setNextUrl,
}: ISavedTracks) => {
  const user = React.useContext(UserContext);

  const fetchMoreTracks = async () => {
    const nextTracks = await post('/user/next', {
      token: user.spotify.accessToken,
      url: nextUrl,
    });
    setSavedTracks((prevState: any) => [...prevState, ...nextTracks.items]);
    setIsFetching(false);
    setNextUrl(nextTracks.next);
  };

  const [isFetching, setIsFetching, listEl] =
    useInfiniteScroll(fetchMoreTracks);

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
      <ul className="track-list" id="tracks" ref={listEl}>
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
