import * as React from 'react';
import { Link } from 'react-router-dom';
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
    <li>
      <Link to={track.id} className="row" onClick={() => dispatch(setSelectedTrack(track))}>
        <img src={track.artworkSmall} alt="album" className="row__album" />
        <section className="details">
          <p className="row__details--title">{track.title}</p>
          <p className="row__details--artist">{track.artist}</p>
        </section>
      </Link>
    </li>
  );
};

export default TrackRow;
