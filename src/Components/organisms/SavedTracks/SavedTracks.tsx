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
} from '../../../store/savedTracks/savedTracks.slice';
import TracksList from '../TracksList/TracksList';

const SavedTracks = () => {
  const [query, setQuery] = React.useState('');
  const listEl = React.useRef<HTMLUListElement>(null);
  const savedTracksState = useAppSelector(state => state.savedTracks);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handleScroll = (): void => {
      if (listEl.current.scrollTop + listEl.current.clientHeight >= listEl.current.scrollHeight) {
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
  }, [dispatch]);

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
      <TracksList
        tracks={savedTracksState.filteredTracks}
        element={listEl}
        children={savedTracksState.loading && <Loader />}
      />
    </div>
  );
};

export default SavedTracks;
