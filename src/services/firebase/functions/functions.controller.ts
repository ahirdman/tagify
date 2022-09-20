import { functions } from '../config';
import { httpsCallable } from 'firebase/functions';
import { HTTPUserTracksResponse } from '../../spotify/spotify.interface';

export const getSpotifyToken = httpsCallable(functions, 'spotifyToken');

export const getSpotifyProfile = httpsCallable(functions, 'getSpotifyProfile')

interface Token {
  token: string
}

export const getInitialSavedTracks = httpsCallable<Token, HTTPUserTracksResponse>(functions, 'getInitialSavedTracks')

export const getNextSavedTracks = httpsCallable<any, any>(functions, 'getNextSavedTracks')