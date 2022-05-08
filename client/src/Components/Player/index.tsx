import { useState, useEffect } from 'react';
import { trackObject } from '../../utils/modules/playerModules';
import PlayButton from '../../assets/playback/play-white.svg';
import PauseButton from '../../assets/playback/pause-white.svg';
import Next from '../../assets/playback/next.svg';
import Previous from '../../assets/playback/previous.svg';
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

  useEffect(() => {
    const script = document.createElement('script');
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
  }, [accessToken]);

  if (!isActive) {
    return (
      <>
        <section className="container">
          <p>Something</p>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="player">
          <img
            src={currentTrack.album.images[0].url}
            alt="album cover"
            className="player__artwork"
          />
          <section className="player__info">
            <h4 className="player__name">{currentTrack.name}</h4>
            <p className="player__artist">{currentTrack.artists[0].name}</p>
          </section>
          <section className="player__control">
            <button
              className="btn-dislike"
              onClick={() => {
                player.nextTrack();
              }}
            >
              <img src={Previous} alt="X" />
            </button>
            <button
              className="btn-playback"
              onClick={() => {
                player.togglePlay();
              }}
            >
              {isPaused ? (
                <img
                  className="btn-playback--play"
                  alt="PLAY"
                  src={PlayButton}
                />
              ) : (
                <img
                  className="btn-playback--pause"
                  alt="PAUSE"
                  src={PauseButton}
                />
              )}
            </button>
            <button
              className="btn-love"
              onClick={() => {
                player.nextTrack();
              }}
            >
              <img src={Next} alt="LOVE" />
            </button>
          </section>
          {/* <footer className="addLove">It's a match! Added to libary</footer> */}
        </section>
      </>
    );
  }
};

export default Player;
