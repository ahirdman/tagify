import * as React from 'react';
import { SavedTracksData } from '../../../services';
import { useAppDispatch } from '../../../store/hooks';
import { setSelectedTrack } from '../../../store/savedTracks/savedTracks.slice';
import './TrackRow.scss';

interface Props {
  track: SavedTracksData;
}

const TrackRow = ({ track }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <li className="row" onClick={() => dispatch(setSelectedTrack(track))}>
      <img src={track.artworkSmall} alt="album" className="row__album" />
      <section className="details">
        <p className="row__details--title">{track.title}</p>
        <p className="row__details--artist">{track.artist}</p>
      </section>
    </li>
  );
};

export default TrackRow;
