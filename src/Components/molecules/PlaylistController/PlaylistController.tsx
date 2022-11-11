import * as React from 'react';
import { SavedTracksData } from '../../../services';
import './PlaylistController.scss';
import { Button, ExportButton } from '../../atoms';
import { IPlaylistStatus } from '../../../store/playlists/playlists.interface';
import Box from '../../atoms/Box/Box';

const lengthOfPlaylist = (tracksArr: SavedTracksData[]) => {
  const ms = tracksArr.map(track => track.duration).reduce((acc, curr) => acc + curr, 0);

  return (ms / 1000 / 60).toFixed(1);
};

interface IProps {
  tracks: SavedTracksData[];
  status: IPlaylistStatus;
  addTracks: () => void;
}

const PlaylistData = ({ tracks, status, addTracks }: IProps) => {
  const length = lengthOfPlaylist(tracks);

  return (
    <div className="playlist">
      <section className="playlist__data">
        <p className="playlist__data--text">{tracks.length} tracks</p>
        <p className="playlist__data--text">{length} minutes</p>
        <p className="playlist__data--text">
          Playlist is{status.sync !== 'SYNCED' ? ' not ' : ' '}synced!
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
        <ExportButton status={status} />
      </section>
      <Box>
        <Button title="Add Tracks" backgroundColor="black" textColor="white" onClick={addTracks} />
      </Box>
    </div>
  );
};

export default PlaylistData;
