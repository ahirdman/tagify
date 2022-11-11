import * as React from 'react';
import { SavedTracksData } from '../../../services';
import { TrackRow } from '../../molecules';
import './TracksList.scss';

interface IProps {
  tracks: SavedTracksData[];
  element?: React.MutableRefObject<HTMLUListElement>;
  children?: React.ReactElement<any, any>;
}

const TracksList = ({ tracks, element, children }: IProps) => {
  return (
    <ul className="track-list" ref={element}>
      {tracks.map((track: SavedTracksData, index) => (
        <TrackRow key={index} track={track} />
      ))}
      {children}
    </ul>
  );
};

export default TracksList;
