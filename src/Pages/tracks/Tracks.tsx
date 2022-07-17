import * as React from 'react';
import Note from '../../assets/music-note.svg';
import SelectTrack from '../../Components/organisms/SavedTracks/SavedTracks';
import SelectedTrack from '../../Components/organisms/SelectedTrack/SelectedTrack';
import EmptyCard from '../../Components/organisms/EmptyCard/EmptyCard';
import useWindowSize from '../../utils/hooks/useWindowSize';
import { IWindow } from '../../utils/interface';
import { post } from '../../utils/httpClient';
import { ISavedObject } from '../../utils/interface';
import './Tracks.scss';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/hooks/UserContext';

interface ITracksProps {
  deviceId: string;
}

const Tracks = ({ deviceId }: ITracksProps) => {
  const [savedTracks, setSavedTracks] = useState([] as ISavedObject[]);
  const [selectedTrack, setSelectedTrack] = useState();

  const user = useContext(UserContext);

  useEffect(() => {
    const getTracks = async () => {
      const savedTracks = await post('/user/saved', {
        token: user.spotify.accessToken,
      });
      setSavedTracks(savedTracks.items);
    };

    if (user.spotify.accessToken) {
      getTracks();
    }
  }, [user.spotify.accessToken]);

  const size: IWindow = useWindowSize();

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
