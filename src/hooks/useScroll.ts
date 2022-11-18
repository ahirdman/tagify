import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchInitialTracks,
  fetchNextTracks,
  filterTracks,
} from '../store/savedTracks/savedTracks.slice';

const useScroll = (listEl: React.MutableRefObject<HTMLUListElement>, filter: string) => {
  const savedTracksState = useAppSelector(state => state.savedTracks.savedTracks);
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
    if (savedTracksState.length !== 0) return;

    dispatch(fetchInitialTracks());
  }, [savedTracksState.length, dispatch]);

  React.useEffect(() => {
    if (filter.length > 0) {
      dispatch(filterTracks(filter));
    }
  }, [filter, savedTracksState, dispatch]);
};

export default useScroll;
