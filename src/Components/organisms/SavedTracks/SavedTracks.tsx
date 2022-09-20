import * as React from 'react';
import Magnifier from '../../../assets/magnifier.svg';
import './SavedTracks.scss';
import { CardNav, SearchBar } from '../..//molecules';
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
  const listEl = React.useRef<HTMLUListElement>(null);
  const savedTracksState = useAppSelector(state => state.savedTracks);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handleScroll = (): void => {
      if (
        listEl.current.scrollTop + listEl.current.clientHeight >=
        listEl.current.scrollHeight
      ) {
      dispatch(fetchNextTracks());
      }
    };

    const currentEl = listEl.current;

    if (currentEl) {
      currentEl.addEventListener('scroll', handleScroll);
    }

    return () => {
      currentEl.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch])

  React.useEffect(() => {
    if (savedTracksState.savedTracks.length !== 0) return;

    dispatch(fetchInitialTracks());

  }, [savedTracksState.savedTracks.length, dispatch]);

  React.useEffect(() => {
    if (query.length > 0) {
      dispatch(filterTracks(query));
    }
  }, [query, savedTracksState.savedTracks, dispatch]);

  return (
    <div className="select">
      <CardNav title="Saved Tracks" />
      <SearchBar icon={Magnifier} setSearch={setQuery} />
      <section className="select__header">
        <p className="select__header--title">TITLE & ARTIST</p>
      </section>
      <ul className="track-list" ref={listEl}>
        {savedTracksState.filteredTracks.map((track, index) => {
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
        {savedTracksState.loading && <Loader />}
      </ul>
    </div>
  );
};

export default SavedTracks;
