import {
  SavedTracksResponse,
  NextTracksBody,
  PlayTrackBody,
  PlaylistBody,
  PlaylistResponse,
  ProfileResponse,
  TokenBody,
  TokenResponse,
  ValidateBody,
  ValidateResponse,
} from './spotify.interface';
import { functions } from '../firebase/config';
import { httpsCallable } from 'firebase/functions';

export const spotifyToken = httpsCallable<void, TokenResponse>(functions, 'spotifyToken');

export const spotifyProfile = httpsCallable<TokenBody, ProfileResponse>(
  functions,
  'getSpotifyProfile'
);

export const initialSavedTracks = httpsCallable<TokenBody, SavedTracksResponse>(
  functions,
  'getInitialSavedTracks'
);

export const nextSavedTracks = httpsCallable<NextTracksBody, SavedTracksResponse>(
  functions,
  'getNextSavedTracks'
);

export const playback = httpsCallable<PlayTrackBody, string>(functions, 'playSpotifyTrack');

export const newPlaylist = httpsCallable<PlaylistBody, PlaylistResponse>(
  functions,
  'createSpotifyPlaylist'
);

export const validate = httpsCallable<ValidateBody, ValidateResponse>(
  functions,
  'validateSnapshot'
);
