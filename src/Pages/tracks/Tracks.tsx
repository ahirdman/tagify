import * as React from 'react';
import Note from '../../assets/music-note.svg';
import {
  SavedTracks,
  SelectedTrack,
  EmptyCard,
} from '../../Components/organisms';
import useWindowSize from '../../hooks/useWindowSize';
import { IWindow } from '../../utils/interface';
import './Tracks.scss';

interface ITracksProps {
  deviceId: string;
  state: any;
  dispatch: any;
}

const Tracks = ({ deviceId, state, dispatch }: ITracksProps) => {
  const [selectedTrack, setSelectedTrack] = React.useState();

  const size: IWindow = useWindowSize();

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        <>
          <SavedTracks
            setSelectedTrack={setSelectedTrack}
            state={state}
            dispatch={dispatch}
          />
          <>
            {selectedTrack ? (
              <SelectedTrack
                selectedTrack={selectedTrack}
                deviceId={deviceId}
              />
            ) : (
              <EmptyCard icon={Note} item="track" />
            )}
          </>
        </>
      </div>
    );
  }

  return (
    <>
      {selectedTrack ? (
        <SelectedTrack
          selectedTrack={selectedTrack}
          deviceId={deviceId}
          setSelectedTrack={setSelectedTrack}
        />
      ) : (
        <SavedTracks
          setSelectedTrack={setSelectedTrack}
          state={state}
          dispatch={dispatch}
        />
      )}
    </>
  );
};

export default Tracks;
