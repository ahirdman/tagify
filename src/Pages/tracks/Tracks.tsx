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
import { UserContext } from '../../utils/hooks/UserContext';

interface ITracksProps {
  deviceId: string;
}

const Tracks = ({ deviceId }: ITracksProps) => {
  const [savedTracks, setSavedTracks] = React.useState([] as ISavedObject[]);
  const [selectedTrack, setSelectedTrack] = React.useState();
  const [nextUrl, setNextUrl] = React.useState();
  const [isFetching, setIsFetching] = React.useState(false);

  const user = React.useContext(UserContext);

  const fetchMoreTracks = async () => {
    const nextTracks = await post('/user/next', {
      token: user.spotify.accessToken,
      url: nextUrl,
    });
    setSavedTracks(prevState => [...prevState, ...nextTracks.items]);
    setIsFetching(false);
    setNextUrl(nextTracks.next);
  };

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
              fetchMoreTracks={fetchMoreTracks}
              setSelectedTrack={setSelectedTrack}
              isFetching={isFetching}
              setIsFetching={setIsFetching}
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
              fetchMoreTracks={fetchMoreTracks}
              setSelectedTrack={setSelectedTrack}
              isFetching={isFetching}
              setIsFetching={setIsFetching}
            />
          )}
        </>
      )}
    </>
  );
};

export default Tracks;
