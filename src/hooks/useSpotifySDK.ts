import * as React from 'react';
import { ICurrentTrack } from '../store/playback/playback.interface';
import { useAppDispatch, useAppSelector } from './../store/hooks';
import {
  clearPlayback,
  setActive,
  setCurrentTrack,
  setDeviceID,
  setPaused,
} from './../store/playback/playback.slice';

const SDKurl = 'https://sdk.scdn.co/spotify-player.js';

const useSpotifySDK = () => {
  const [player, setPlayer] = React.useState(null);
  const [SDKReady, setSDKReady] = React.useState(false);

  const currentTrackRef = React.useRef<ICurrentTrack | null>(null);
  const firstTrackRef = React.useRef<ICurrentTrack | null>(null);
  const activeSessionRef = React.useRef<boolean | null>(null);
  const iFrameRef = React.useRef(null);

  const accessToken = useAppSelector(state => state.user.spotify.accessToken);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('id', 'spotPlayer');
    script.src = SDKurl;
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      setSDKReady(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  React.useEffect((): any => {
    if (!SDKReady) return;

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

      const stateTrack = state.track_window.current_track;
      const trackRef = currentTrackRef.current;
      const validTrackRef = trackRef && trackRef.id;

      if (!trackRef) {
        dispatch(setCurrentTrack(stateTrack));
        firstTrackRef.current = stateTrack;
      }

      if (validTrackRef && trackRef.id !== stateTrack.id) {
        dispatch(setCurrentTrack(stateTrack));
      }

      currentTrackRef.current = stateTrack;
      dispatch(setPaused(state.paused));

      spotifySDK.getCurrentState().then(state => {
        if (!state) {
          dispatch(setActive(false));
        }
        if (state && !activeSessionRef.current) {
          activeSessionRef.current = true;
          dispatch(setActive(true));
        }
      });
    });

    const iFrame = document.querySelector(
      'iframe[alt="Audio Playback Container"]'
    );

    iFrame.setAttribute('title', 'SDKPlayer');
    iFrameRef.current = iFrame;

    return () => {
      spotifySDK.removeListener('ready');
      spotifySDK.removeListener('player_state_changed');
      spotifySDK.disconnect();
      iFrameRef.current.remove();
      dispatch(clearPlayback());
    };
  }, [accessToken, dispatch, SDKReady]);

  return player;
};

export default useSpotifySDK;
