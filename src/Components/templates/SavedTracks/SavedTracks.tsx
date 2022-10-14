import * as React from 'react';
import { Loader } from '../../atoms';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchInitialTracks,
  fetchNextTracks,
  filterTracks,
} from '../../../store/savedTracks/savedTracks.slice';
import { TracksList } from '../../organisms';
import Card from '../../../Layout/Card/Card';

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
    <Card title="Saved Tracks" filter={true} setFilter={setQuery}>
      <TracksList
        tracks={savedTracksState.filteredTracks}
        element={listEl}
        children={savedTracksState.loading && <Loader />}
      />
    </Card>
  );
};

export default SavedTracks;
