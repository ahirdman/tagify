import * as React from 'react';
import Note from '../../assets/music-note.svg';
import SelectTrack from '../../Components/organisms/SavedTracks/SavedTracks';
import SelectedTrack from '../../Components/organisms/SelectedTrack/SelectedTrack';
import EmptyCard from '../../Components/organisms/EmptyCard/EmptyCard';
import useWindowSize from '../../utils/hooks/window';
import { IWindow } from '../../utils/interface';
import './Tracks.scss';

interface ITracksProps {
  savedTracks: any;
  selectedTrack: any;
  setSelectedTrack: any;
  deviceId: any;
  accessToken: any;
}

const Tracks = ({
  savedTracks,
  selectedTrack,
  setSelectedTrack,
  deviceId,
  accessToken,
}: ITracksProps) => {
  const size: IWindow = useWindowSize();

  //   return (
  //     <div className="tracks-view">
  //       {savedTracks && (
  //         <>
  //           <SelectTrack
  //             savedTracks={savedTracks}
  //             setSelectedTrack={setSelectedTrack}
  //           />
  //           <>
  //             {selectedTrack ? (
  //               <SelectedTrack
  //                 selectedTrack={selectedTrack}
  //                 deviceId={deviceId}
  //                 accessToken={accessToken}
  //               />
  //             ) : (
  //               <EmptyCard icon={Note} item="track" />
  //             )}
  //           </>
  //         </>
  //       )}
  //     </div>
  //   );
  // };

  if (size.width >= 900) {
    return (
      <div className="tracks-view">
        {savedTracks && (
          <>
            <SelectTrack
              savedTracks={savedTracks}
              setSelectedTrack={setSelectedTrack}
            />
            <>
              {selectedTrack ? (
                <SelectedTrack
                  selectedTrack={selectedTrack}
                  deviceId={deviceId}
                  accessToken={accessToken}
                />
              ) : (
                <EmptyCard icon={Note} item="track" />
              )}
            </>
          </>
        )}
      </div>
    );
  }

  return (
    <>
      {savedTracks && (
        <>
          {selectedTrack ? (
            <SelectedTrack
              selectedTrack={selectedTrack}
              deviceId={deviceId}
              accessToken={accessToken}
              setSelectedTrack={setSelectedTrack}
            />
          ) : (
            <SelectTrack
              savedTracks={savedTracks}
              setSelectedTrack={setSelectedTrack}
            />
          )}
        </>
      )}
    </>
  );
};

export default Tracks;
