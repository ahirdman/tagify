import { useState } from 'react';
import { SavedTracksData } from '../../../services';
import { useAppDispatch } from '../../../store/hooks';
import { setSelectedTrack } from '../../../store/savedTracks/savedTracks.slice';
import './TrackRow.scss';
import { Check } from './TrackRow.svg';

interface Props {
  track: SavedTracksData;
  onSelect?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, track: SavedTracksData) => void;
  onNavigate?: (path: string) => void;
}

const TrackRow = ({ track, onSelect, onNavigate }: Props) => {
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = (e: any) => {
    e.preventDefault();

    if (onSelect) {
      onSelect(e, track);
      setActive(!active);
    }

    if (onNavigate) {
      dispatch(setSelectedTrack(track));
      onNavigate(`../tracks/${track.id}`);
    }
  };

  return (
    <li className="row" onClick={e => handleClick(e)}>
      <img src={track.artworkSmall} alt="album" className="row__album" />
      <div className="row__inner">
        <div className="row__details">
          <p className="row__details--title">{track.title}</p>
          <p className="row__details--artist">{track.artist}</p>
        </div>
        {active && <Check />}
      </div>
    </li>
  );
};

export default TrackRow;
