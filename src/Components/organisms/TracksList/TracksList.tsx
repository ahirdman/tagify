import * as React from 'react';
import { SavedTracksData } from '../../../services';
import { TrackRow } from '../../molecules/index';
import './TracksList.scss';

interface Props {
  tracks: SavedTracksData[];
  element?: React.MutableRefObject<HTMLUListElement>;
  children?: React.ReactElement<any, any>;
}

const TracksList = ({ tracks, element, children }: Props) => {
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
