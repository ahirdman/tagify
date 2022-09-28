import * as React from 'react';
import { ICurrentTrack } from '../store/playback/playback.interface';
import { useAppDispatch } from './../store/hooks';
import {
  clearPlayback,
  setActive,
  setCurrentTrack,
  setDeviceID,
  setPaused,
} from './../store/playback/playback.slice';
import useSDKScript from './useSDKScript';
import { Spotify } from '../services/index';
import { setSpotifyToken } from '../store/user/user.slice';

const useSpotifySDK = () => {
  const [player, setPlayer] = React.useState(undefined);

  const SDKReady = useSDKScript();
  const dispatch = useAppDispatch();

  const currentTrackRef = React.useRef<ICurrentTrack | null>(null);
  const firstTrackRef = React.useRef<ICurrentTrack | null>(null);
  const activeSessionRef = React.useRef<boolean | null>(null);
  const pausedRef = React.useRef<boolean | null>(null);

  React.useEffect((): any => {
    if (!SDKReady) return;
    const spotifySDK = new window.Spotify.Player({
      name: 'Moodify',

      getOAuthToken: async cb => {
        const token: any = await Spotify.getSpotifyToken();
        dispatch(
          setSpotifyToken({
            token: token.accessToken,
          })
        );
        cb(token.accessToken);
      },
      volume: 0.5,
    });

    setPlayer(spotifySDK);

    const iFrame =
      document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]') || null;

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

      if (pausedRef.current !== state.paused) {
        dispatch(setPaused(state.paused));
        pausedRef.current = state.paused;
      }

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

    return () => {
      spotifySDK.removeListener('ready');
      spotifySDK.removeListener('player_state_changed');
      spotifySDK.disconnect();
      if (iFrame) {
        document.body.removeChild(iFrame);
      }
      dispatch(clearPlayback());
      setPlayer(undefined);
    };
  }, [dispatch, SDKReady]);

  return player;
};

export default useSpotifySDK;
