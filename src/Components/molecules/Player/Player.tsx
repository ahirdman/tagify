import PlayButton from '../../../assets/playback/play-white.svg';
import PauseButton from '../../../assets/playback/pause-white.svg';
import './Player.scss';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  clearPlayback,
  setActive,
  setCurrentTrack,
  setDeviceID,
  setPaused,
} from '../../../store/playback/playback.slice';

// interface INavbarProps {
//   setDeviceId: any;
// }

// const trackObject = {
//   name: '',
//   album: {
//     images: [{ url: '' }],
//   },
//   artists: [{ name: '' }],
// };

const Player = () => {
  const [player, setPlayer] = React.useState(undefined);
  const { isActive } = useAppSelector(state => state.playback);
  const dispatch = useAppDispatch();

  const SDKurl = 'https://sdk.scdn.co/spotify-player.js';
  const iFrameRef = React.useRef(null);

  console.log('rendered player');

  const accessToken = useAppSelector(state => state.user.spotify.accessToken);

  React.useEffect(() => {
    console.log('player useEffect');
    const script = document.createElement('script');
    script.setAttribute('id', 'spotPlayer');
    script.src = SDKurl;
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifySDK = new window.Spotify.Player({
        name: 'Moodify',
        getOAuthToken: cb => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(spotifySDK);

      spotifySDK.addListener('ready', ({ device_id }) => {
        dispatch(setDeviceID(device_id));
      });

      spotifySDK.connect();

      spotifySDK.addListener('player_state_changed', state => {
        if (!state) return;
        // console.log('player state changed:', state);

        // if (state.track_window.current_track !== currentTrack) {
        //   console.log('different tracks:');
        //   console.log('listener:', state.track_window.current_track);
        //   console.log('store:', currentTrack);
        // }

        // Current track is empty - why??
        dispatch(setCurrentTrack(state.track_window.current_track));

        dispatch(setPaused(state.paused));

        spotifySDK.getCurrentState().then((state: any) => {
          console.log('get current state');
          !state ? dispatch(setActive(false)) : dispatch(setActive(true));
        });
      });

      const iFrame = document.querySelector(
        'iframe[alt="Audio Playback Container"]'
      );

      iFrame.setAttribute('title', 'SDKPlayer');
      iFrameRef.current = iFrame;

      return () => {
        console.log('removing listeners');
        spotifySDK.removeListener('ready');
        spotifySDK.removeListener('player_state_changed');
        spotifySDK.disconnect();
        console.log('spotify disconnected');
      };
    };

    return () => {
      iFrameRef.current.remove();
      script.remove();
      dispatch(clearPlayback());
    };
  }, [accessToken, dispatch]);

  if (!isActive) {
    return <section className="player player--inactive"></section>;
  } else {
    return (
      <div className="player">
        <PlayBackInfo />
        <PlaybackButton onClick={() => player.togglePlay()} />
      </div>
    );
  }
};

export default Player;

export const PlayBackInfo = () => {
  const { currentTrack } = useAppSelector(state => state.playback);

  const memoizesTrack = React.useMemo(() => currentTrack, [currentTrack]);

  return (
    <div className="player__track">
      <img
        src={memoizesTrack.album.images[0].url}
        alt="album cover"
        className="player__artwork"
      />
      <div className="player__info">
        <p className="player__info--name">{memoizesTrack.name}</p>
        <p className="player__info--artist">{memoizesTrack.artists[0].name}</p>
      </div>
    </div>
  );
};

interface IPlaybackButtonProps {
  onClick: any;
}

export const PlaybackButton = ({ onClick }: IPlaybackButtonProps) => {
  const { isPaused } = useAppSelector(state => state.playback);
  return (
    <button className="player__control" onClick={onClick}>
      {isPaused ? (
        <img className="player__control--play" alt="PLAY" src={PlayButton} />
      ) : (
        <img className="player__control--pause" alt="PAUSE" src={PauseButton} />
      )}
    </button>
  );
};
