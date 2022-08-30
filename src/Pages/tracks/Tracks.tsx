import * as React from 'react';
import Note from '../../assets/music-note.svg';
import {
  SavedTracks,
  SelectedTrack,
  EmptyCard,
} from '../../Components/organisms';
import useWindowSize, { Window } from '../../hooks/useWindowSize';
import { useAppSelector } from '../../store/hooks';
import { selectedTrackSelector } from '../../store/savedTracks/savedTracks.slice';
import './Tracks.scss';

const Tracks = () => {
  const selectedTrack = useAppSelector(selectedTrackSelector);

  const size: Window = useWindowSize();

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <>
          <SavedTracks />
          <>
            {selectedTrack ? (
              <SelectedTrack />
            ) : (
              <EmptyCard icon={Note} item="track" />
            )}
          </>
        </>
      </div>
    );
  }

  return <>{selectedTrack ? <SelectedTrack /> : <SavedTracks />}</>;
};

export default Tracks;
