import { functions } from '../config';
import { httpsCallable } from 'firebase/functions';
import { HTTPUserTracksResponse } from '../../spotify/spotify.interface';

export const getSpotifyToken = httpsCallable(functions, 'spotifyToken');

export const getSpotifyProfile = httpsCallable(functions, 'getSpotifyProfile')

interface Initial {
  token: string
}
interface Next {
  token: string
  url: string
}

export const getInitialSavedTracks = httpsCallable<Initial, HTTPUserTracksResponse>(functions, 'getInitialSavedTracks')

export const getNextSavedTracks = httpsCallable<Next, HTTPUserTracksResponse>(functions, 'getNextSavedTracks')