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
import { UserContext } from '../../utils/context/UserContext';

interface ITracksProps {
  deviceId: string;
}

const Tracks = ({ deviceId }: ITracksProps) => {
  const [savedTracks, setSavedTracks] = React.useState([] as ISavedObject[]);
  const [selectedTrack, setSelectedTrack] = React.useState();
  const [nextUrl, setNextUrl] = React.useState();

  const user = React.useContext(UserContext);

  React.useEffect(() => {
    const getTracks = async () => {
      const savedTracks = await post('/user/saved', {
        token: user.spotify.accessToken,
      });
      setSavedTracks(savedTracks.items);
      setNextUrl(savedTracks.next);
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
              setSavedTracks={setSavedTracks}
              setSelectedTrack={setSelectedTrack}
              nextUrl={nextUrl}
              setNextUrl={setNextUrl}
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
              setSavedTracks={setSavedTracks}
              setSelectedTrack={setSelectedTrack}
              nextUrl={nextUrl}
              setNextUrl={setNextUrl}
            />
          )}
        </>
      )}
    </>
  );
};

export default Tracks;
