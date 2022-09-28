import * as React from 'react';
import { SavedTracksData } from '../../../services';
import { useAppSelector } from '../../../store/hooks';
import './PlaylistController.scss';
import { ExportButton } from '../../atoms';

const lengthOfPlaylist = (tracksArr: SavedTracksData[]) => {
  const ms = tracksArr.map(track => track.duration).reduce((acc, curr) => acc + curr, 0);

  return (ms / 1000 / 60).toFixed(1);
};

const PlaylistData = () => {
  const { sync } = useAppSelector(state => state.playlist.selectedList.status);
  const tracks = useAppSelector(state => state.playlist.selectedList.tracks);

  const length = lengthOfPlaylist(tracks);

  return (
    <div className="playlist">
      <section className="playlist__data">
        <p className="playlist__data--text">{tracks.length} tracks</p>
        <p className="playlist__data--text">{length} minutes</p>
        <p className="playlist__data--text">
          Playlist is{sync !== 'SYNCED' ? ' not ' : ' '}synced!
        </p>
      </section>
      <section className="playlist__control">
        <button
          className="playlist__button playlist__button--edit"
          onClick={e => {
            e.preventDefault();
            console.log('edit list');
          }}
        >
          Edit
        </button>
        <ExportButton />
      </section>
    </div>
  );
};

export default PlaylistData;
