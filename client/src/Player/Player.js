import React, { useState, useEffect } from 'react';
import './Player.scss';
import fetchJson from '../httpClient';

export const Player = ({ accessToken }) => {
  const [player, setPlayer] = useState(undefined);
  const [isPaused, setPaused] = useState(false);
  const [isActive, setActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    name: '',
    album: {
      images: [{ url: '' }],
    },
    artists: [{ name: '' }],
  });

  // const getTrack = async () => {
  //   const track = await fetchJson('/track', accessToken, '7jvCeWOSnJs2N3spqobWnO')
  //   setTrack({
  //     url: track.preview_url,
  //     image: track.album.images[0].url,
  //   })
  // }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Tinerify',
        getOAuthToken: cb => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.connect();

      player.addListener('player_state_changed', state => {
        if (!state) {
          return;
        }

        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then(state => {
          !state ? setActive(false) : setActive(true);
        });
      });
    };
  }, []);

  if (!isActive) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              {' '}
              Instance not active. Transfer your playback using your Spotify app{' '}
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={currentTrack.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{currentTrack.name}</div>

              <div className="now-playing__artist">
                {currentTrack.artists[0].name}
              </div>
            </div>
          </div>
        </div>
        <button
          className="btn-spotify"
          onClick={() => {
            player.previousTrack();
          }}
        >
          &lt;&lt;
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            player.togglePlay();
          }}
        >
          {isPaused ? 'PLAY' : 'PAUSE'}
        </button>

        <button
          className="btn-spotify"
          onClick={() => {
            player.nextTrack();
          }}
        >
          &gt;&gt;
        </button>
      </>
    );
  }
};
