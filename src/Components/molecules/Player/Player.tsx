// import { trackObject } from '../../../utils/modules/playerModules';
import PlayButton from '../../../assets/playback/play-white.svg';
import PauseButton from '../../../assets/playback/pause-white.svg';
import './Player.scss';
import * as React from 'react';
import { UserContext } from '../../../context/UserContext';

interface INavbarProps {
  setDeviceId: any;
}

const trackObject = {
  name: '',
  album: {
    images: [{ url: '' }],
  },
  artists: [{ name: '' }],
};

const Player = ({ setDeviceId }: INavbarProps) => {
  const [player, setPlayer] = React.useState(undefined);
  const [isPaused, setPaused] = React.useState(false);
  const [isActive, setActive] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState(trackObject);

  const SDKurl = 'https://sdk.scdn.co/spotify-player.js';
  const iFrameRef = React.useRef(null);

  const user = React.useContext(UserContext);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('id', 'spotPlayer');
    script.src = SDKurl;
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifySDK = new window.Spotify.Player({
        name: 'Tinderify',
        getOAuthToken: cb => {
          cb(user.spotify.accessToken);
        },
        volume: 0.5,
      });

      setPlayer(spotifySDK);

      spotifySDK.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
      });

      spotifySDK.connect();

      spotifySDK.addListener('player_state_changed', state => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);

        spotifySDK.getCurrentState().then(state => {
          !state ? setActive(false) : setActive(true);
        });
      });

      const iFrame = document.querySelector(
        'iframe[alt="Audio Playback Container"]'
      );
      iFrame.setAttribute('title', 'SDKPlayer');
      iFrameRef.current = iFrame;
    };

    return () => {
      iFrameRef.current.remove();
      script.remove();
    };
  }, [user.spotify.accessToken, setDeviceId]);

  if (!isActive) {
    return <section className="player player--inactive"></section>;
  } else {
    return (
      <div className="player">
        <div className="player__track">
          <img
            src={currentTrack.album.images[0].url}
            alt="album cover"
            className="player__artwork"
          />
          <div className="player__info">
            <p className="player__info--name">{currentTrack.name}</p>
            <p className="player__info--artist">
              {currentTrack.artists[0].name}
            </p>
          </div>
        </div>
        <button
          className="player__control"
          onClick={() => {
            player.togglePlay();
          }}
        >
          {isPaused ? (
            <img
              className="player__control--play"
              alt="PLAY"
              src={PlayButton}
            />
          ) : (
            <img
              className="player__control--pause"
              alt="PAUSE"
              src={PauseButton}
            />
          )}
        </button>
      </div>
    );
  }
};

export default Player;
