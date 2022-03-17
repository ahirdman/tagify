import React, { useState, useEffect } from 'react';
import './Player.scss';
import fetchJson from '../httpClient';
import PlayButton from '../assets/play.svg'
import PauseButton from '../assets/pause.svg'
import Love from '../assets/love.svg'
import Dislike from '../assets/dislike.svg'

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

  const saveTrack = (ids) => {
    fetchJson('/save', accessToken, ids.id)
    document.querySelector('.addLove').classList.add('addLove--visible')
    setTimeout(() => {
      document.querySelector('.addLove').classList.remove('addLove--visible')
    }, 2000)
  }

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
        <section className="container">
          <button className="container__start" onClick={() => {startSession(devideId)}}>Start Matching</button>
        </section>
      </>
    );
  } else {
    return (
      <>
        <section className="now-playing">
            <img
              src={currentTrack.album.images[0].url}
              className="now-playing__cover"/>
            <section className="now-playing__info">
              <h4 className="now-playing__name">{currentTrack.name}</h4>
              <p className="now-playing__artist">{currentTrack.artists[0].name}</p>
        </section>
        <section className='now-playing__control'>
          <button className="btn-dislike"
            onClick={() => { player.nextTrack(); }}>
            <img src={Dislike} />
          </button>
          <button className="btn-playback"
            onClick={() => { player.togglePlay(); }}>
            {isPaused
              ? <img className="btn-playback--play" src={PlayButton} />
              : <img className="btn-playback--pause" src={PauseButton} />}
          </button>
          <button className="btn-love"
            onClick={() => {
              saveTrack(currentTrack)
              player.nextTrack()
            }}>
            <img src={Love} /></button>
          </section>
          <footer className='addLove'>It's a match! Added to libary</footer>
        </section>
      </>
    );
  }
};
