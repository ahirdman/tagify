import { useState, useEffect } from 'react';
import { trackObject } from '../../../utils/modules/playerModules';
import PlayButton from '../../../assets/playback/play-white.svg';
import PauseButton from '../../../assets/playback/pause-white.svg';
import './Player.scss';
import * as React from 'react';

interface IAccessProp {
  accessToken?: string;
  setDeviceId: any;
}

export const Player = ({ accessToken, setDeviceId }: IAccessProp) => {
  const [player, setPlayer] = useState(undefined);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(trackObject);

  const existingScript = () => document.getElementById('player');

  useEffect(() => {
    if (existingScript) return;
    const script = document.createElement('script');
    script.setAttribute('id', 'player');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Tinderify',
        getOAuthToken: cb => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        setDeviceId(device_id);
      });

      player.connect();

      player.addListener('player_state_changed', state => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then(state => {
          !state ? setActive(false) : setActive(true);
        });
      });
    };
  }, [accessToken, setDeviceId]);

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
