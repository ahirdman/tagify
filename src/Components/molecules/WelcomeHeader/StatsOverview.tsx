import { useAppSelector } from '../../../store/hooks';
import {
  selectMixedPlaylists,
  selectNumberOfTaggedTracks,
  selectTagPlaylists,
} from '../../../store/playlists/playlists.slice';
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
  const totalSavedTracks = useAppSelector(state => state.savedTracks.total);
  const totalMixes = useAppSelector(selectMixedPlaylists);
  const totalTags = useAppSelector(selectTagPlaylists);
  const taggedTracks = useAppSelector(selectNumberOfTaggedTracks);

  const percentageOfTracksTagged = (tagged: number, total: number) => (tagged / total) * 100;

  return (
    <>
      <div className="header__progress-bar">
        <div
          className="header__progress-bar--progress"
          style={{ width: `${percentageOfTracksTagged(taggedTracks, totalSavedTracks)}%` }}
        ></div>
      </div>
      <p>{`${percentageOfTracksTagged(taggedTracks, totalSavedTracks).toFixed(1)}%`}</p>
      <ul className="header__items">
        <li className="header__item">
          {taggedTracks} tracks tagged out of {totalSavedTracks}
        </li>
        <li className="header__item">Mixes: {totalMixes.length}</li>
        <li className="header__item">Tags: {totalTags.length}</li>
      </ul>
    </>
  );
};
