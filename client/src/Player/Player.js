import React, { useState, useEffect } from 'react';
import './Player.scss';
import fetchJson from '../httpClient';

export const Player = ({ accessToken }) => {

  const [devideId, setDevideId] = useState('');
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

  const saveTrack = (ids) => fetchJson('/save', accessToken, ids.id)

  const startSession = async (sdkId) => fetchJson('/start', accessToken, sdkId)

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

      player.addListener('ready', ({ device_id }) => {
        setDevideId(device_id);
    });

      player.connect();

      player.addListener('player_state_changed', state => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState()
          .then(state => {
          !state ? setActive(false) : setActive(true);
        });
      });
    };
  }, []);

  if (!isActive) {
    return (
      <>
        <div className="container">
        <button className="btn-spotify" onClick={() => {startSession(devideId)}}>Start</button>
            <p>Instance not active. Transfer your playback using your Spotify app</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
 
          
            <img
              src={currentTrack.album.images[0].url}
              className="now-playing__cover"/>
            <section className="now-playing__side">
              <h4 className="now-playing__name">{currentTrack.name}</h4>
              <p className="now-playing__artist">{currentTrack.artists[0].name}</p>
            </section>
          </div>
        <button className="btn-spotify" onClick={() => {player.nextTrack();}}>X</button>
        <button className="btn-spotify" onClick={() => {player.togglePlay();}}>
          {isPaused ? 'PLAY' : 'PAUSE'}
        </button>
        <button className="btn-spotify" onClick={() => {
          saveTrack(currentTrack)
          player.nextTrack()
        }}>Love</button>
      </>
    );
  }
};
