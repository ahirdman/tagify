import { useAppSelector } from 'store/hooks';
import { selectTaggedTracks } from 'store/playlists/playlists.slice';
import { SavedTracksData } from '../../../services';
import { TrackRow } from '../../molecules';
import './TracksList.scss';

interface IProps {
  tracks: SavedTracksData[];
  element?: React.MutableRefObject<HTMLUListElement>;
  children?: React.ReactElement<any, any>;
  onSelect?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, track?: SavedTracksData) => void;
  onNavigate?: (path: string) => void;
}

const TracksList = ({ tracks, element, children, onSelect, onNavigate }: IProps) => {
  const taggedTracks = useAppSelector(selectTaggedTracks);

  return (
    <ul className="track-list" ref={element}>
      {tracks.map((track: SavedTracksData, index) => (
        <TrackRow
          key={index}
          track={track}
          onSelect={onSelect}
          onNavigate={onNavigate}
          tagged={taggedTracks.includes(track.id)}
        />
      ))}
      {children}
    </ul>
  );
};

export default TracksList;
