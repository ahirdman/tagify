import * as React from 'react';
import SavedTracks from './SavedTracks';
import './Tracks.scss';

const Tracks = () => {
  // const size: Window = useWindowSize();

  // if (size.width >= 900) {
  //   return (
  //     <div className="tracks-view">
  //       <>
  //         <SavedTracks />
  //         <>{selectedTrack ? <SelectedTrack /> : <EmptyCard icon={Back} item="track" />}</>
  //       </>
  //     </div>
  //   );
  // }

  return <SavedTracks />;
};

export default Tracks;
