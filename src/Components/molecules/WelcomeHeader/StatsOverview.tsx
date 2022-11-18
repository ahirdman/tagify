import * as React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { selectMixedPlaylists, selectTagPlaylists } from '../../../store/playlists/playlists.slice';
import './StatsOverview.scss';

const StatsOverview = () => {
  return (
    <section className="header">
      <Stats />
    </section>
  );
};

export default StatsOverview;

const Stats = () => {
  const taggedTracks = useAppSelector(state => state.statistics.taggedTracks);
  const totalSavedTracks = useAppSelector(state => state.savedTracks.total);
  const totalMixes = useAppSelector(selectMixedPlaylists);
  const totalTags = useAppSelector(selectTagPlaylists);

  return (
    <ul className="header__items">
      <li className="header__item">Tagged Tracks: {taggedTracks}</li>
      <li className="header__item">Total Saved Tracks: {totalSavedTracks}</li>
      <li className="header__item">Total Mixes: {totalMixes.length}</li>
      <li className="header__item">Total Tags: {totalTags.length}</li>
    </ul>
  );
};
