import * as React from 'react';
import { SavedTracksData } from '../../../services';
import { createPlaylist } from '../../../store/playlists/playlists.slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import './PlaylistController.scss';

interface Props {
  tracks: SavedTracksData[];
}

const PlaylistData = ({ tracks }: Props) => {
  const dispatch = useAppDispatch();
  const sync = useAppSelector(state => state.playlist.sync);

  const lengthOfPlaylist = (tracksArr: SavedTracksData[]) => {
    const ms = tracksArr.map(track => track.duration).reduce((acc, curr) => acc + curr, 0);

    return (ms / 1000 / 60).toFixed(1);
  };

  const length = lengthOfPlaylist(tracks);

  return (
    <div className="playlist">
      <section className="playlist__data">
        <p className="playlist__data--text">{tracks.length} tracks</p>
        <p className="playlist__data--text">{length} minutes</p>
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
        <button
          className="playlist__button playlist__button--export"
          onClick={e => {
            e.preventDefault();
            dispatch(createPlaylist());
          }}
        >
          {sync.exporting ? 'Exporting...' : 'Export'}
        </button>
      </section>
    </div>
  );
};

export default PlaylistData;
