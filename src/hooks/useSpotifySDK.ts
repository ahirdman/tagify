import * as React from 'react';
import { ICurrentTrack } from '../store/playback/playback.interface';
import { Spotify } from '../services/index';
import { useAppDispatch, useAppSelector } from './../store/hooks';
import {
  clearPlayback,
  setActive,
  setCurrentTrack,
  setDeviceID,
  setPaused,
} from './../store/playback/playback.slice';
import useSDKScript from './useSDKScript';
import {
  refreshSpotifyToken,
  setConsumed,
  setSpotifyToken,
} from '../store/user/user.slice';
import {
  getToken,
  refreshToken,
} from '../services/firebase/functions/functions.controller';

const useSpotifySDK = () => {
  const [player, setPlayer] = React.useState(undefined);

  const SDKReady = useSDKScript();

  const { accessToken, consumedBySDK } = useAppSelector(
    state => state.user.spotify.auth
  );
  const uid = useAppSelector(state => state.user.fireId);
  const dispatch = useAppDispatch();

  const currentTrackRef = React.useRef<ICurrentTrack | null>(null);
  const firstTrackRef = React.useRef<ICurrentTrack | null>(null);
  const activeSessionRef = React.useRef<boolean | null>(null);
  const pausedRef = React.useRef<boolean | null>(null);

  React.useEffect((): any => {
    if (!SDKReady) return;
    console.log('SDK effect ran');
    const spotifySDK = new window.Spotify.Player({
      name: 'Moodify',

      getOAuthToken: async cb => {
        // After initial load (app starts with new token) - refresh token
        // if (consumedBySDK) {
        //   const token = await Spotify.refreshToken(uid);
        //   dispatch(
        //     refreshSpotifyToken({
        //       accessToken: token.access_token,
        //       expires: token.expires_in,
        //     })
        //   );

        //   cb(token.access_token);
        //   console.log('authtoken callback refresh');
        // }

        // dispatch(setConsumed());
        // cb(accessToken);
        // console.log('authtoken callback initial');

        // Will it increase?
        let initialLoad = true;

        if (initialLoad) {
          const token = await getToken();
          dispatch(
            setSpotifyToken({
              accessToken: token.access_token,
            })
          );
          initialLoad = false;
          cb(token.access_token);
        } else {
          const token = await refreshToken();
          dispatch(
            setSpotifyToken({
              accessToken: token.access_token,
            })
          );
          cb(token.access_token);
        }
      },
      volume: 0.5,
    });

    setPlayer(spotifySDK);

    const iFrame =
      document.querySelector(
        'iframe[src="https://sdk.scdn.co/embedded/index.html"]'
      ) || null;

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
  }, [accessToken, dispatch, SDKReady]);

  return player;
};

export default useSpotifySDK;
