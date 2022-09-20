import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import './SavedTracks.scss';
import { CardNav, SearchBar } from '../..//molecules';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { Loader } from '../../atoms';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchInitialTracks,
  fetchNextTracks,
  filterTracks,
  setSelectedTrack,
} from '../../../store/savedTracks/savedTracks.slice';

const SavedTracks = () => {
  const [query, setQuery] = React.useState('');
  const tracks = useAppSelector(state => state.savedTracks);
  const dispatch = useAppDispatch();

  const fetchedAllTracks = tracks.savedTracks.length === tracks.total;
  const resumeFetching =
    tracks.filteredTracks.length < 8 &&
    tracks.total !== tracks.filteredTracks.length;

  const fetchMoreTracks = async () => {
    if (fetchedAllTracks) return;

    dispatch(fetchNextTracks(tracks.nextUrl));

    setIsFetching(false);
  };

  const [isFetching, setIsFetching, listEl] = useInfiniteScroll(
    fetchMoreTracks,
    resumeFetching
  );

  React.useEffect(() => {
    if (tracks.savedTracks.length !== 0) return;

    dispatch(fetchInitialTracks());

  }, [tracks.savedTracks.length, dispatch]);

  React.useEffect(() => {
    if (query.length > 0) {
      dispatch(filterTracks(query));
    }
  }, [query, tracks.savedTracks, dispatch]);

  return (
    <div className="select">
      <CardNav title="Saved Tracks" />
      <SearchBar icon={Magnifier} setSearch={setQuery} />
      <section className="select__header">
        <p className="select__header--title">TITLE & ARTIST</p>
      </section>
      <ul className="track-list" ref={listEl}>
        {tracks.filteredTracks.map((track, index) => {
          return (
            <li
              onClick={() => dispatch(setSelectedTrack(track))}
              key={index}
              className="track-list__row"
            >
              <img
                src={track.artworkSmall}
                alt="album"
                className="track-list__album"
              />
              <section className="track-list__details">
                <p className="track-list__details--title">{track.name}</p>
                <p className="track-list__details--artist">{track.artist}</p>
              </section>
            </li>
          );
        })}
        {isFetching && !fetchedAllTracks && <Loader />}
      </ul>
    </div>
  );
};

export default SavedTracks;
