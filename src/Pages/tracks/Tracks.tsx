import * as React from 'react';
import useWindowSize, { Window } from '../../hooks/useWindowSize';
import { useAppSelector } from '../../store/hooks';
import { selectedTrackSelector } from '../../store/savedTracks/savedTracks.slice';
import { SavedTracks, SelectedTrack, EmptyCard } from '../../Components/templates';
import Back from '../../assets/add.svg';
import './Tracks.scss';

const Tracks = () => {
  const selectedTrack = useAppSelector(selectedTrackSelector);

  const size: Window = useWindowSize();

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <>
          <SavedTracks />
          <>{selectedTrack ? <SelectedTrack /> : <EmptyCard icon={Back} item="track" />}</>
        </>
      </div>
    );
  }

  return <>{selectedTrack ? <SelectedTrack /> : <SavedTracks />}</>;
};

export default Tracks;
