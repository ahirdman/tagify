import {
  SavedTracksResponse,
  NextTracksBody,
  ProfileResponse,
  TokenBody,
  TokenResponse,
  PlayTrackBody,
} from './spotify.interface';
import {
  addTracksToPlaylist,
  createEmptyPlaylist,
  extractUris,
  post,
  postWithCookie,
  savedDataExtractor,
} from './spotify.service';
import { functions } from '../firebase/config';
import { httpsCallable } from 'firebase/functions';

export const getSpotifyToken = httpsCallable<void, TokenResponse>(functions, 'spotifyToken');

export const getSpotifyProfile = httpsCallable<TokenBody, ProfileResponse>(
  functions,
  'getSpotifyProfile'
);

const initialSavedTracks = httpsCallable<TokenBody, SavedTracksResponse>(
  functions,
  'getInitialSavedTracks'
);

export const getInitialSavedTracks = async (token: string) => {
  const response = await initialSavedTracks({ token });
  const tracks = savedDataExtractor(response.data.items);

  return {
    total: response.data.total,
    nextUrl: response.data.next,
    savedTracks: tracks,
    filteredTracks: tracks,
  };
};

const nextSavedTracks = httpsCallable<NextTracksBody, SavedTracksResponse>(
  functions,
  'getNextSavedTracks'
);

export const getNextSavedTracks = async (token: string, nextUrl: string) => {
  const response = await nextSavedTracks({ token, url: nextUrl });
  const tracks = savedDataExtractor(response.data.items);

  return {
    total: response.data.total,
    nextUrl: response.data.next,
    savedTracks: tracks,
    filteredTracks: tracks,
  };
};

// Unconverted calls

const playback = httpsCallable<PlayTrackBody, string>(functions, 'playSpotifyTrack');

export const playTrack = async (deviceId: string, token: string, uri: string): Promise<void> => {
  const response = await playback({ uri, token, deviceId });
  console.log(response.data);
};

export const authorizeSpotify = async (uid: string) => {
  const response = await postWithCookie('/auth', { uid });
  return (window.location.href = response);
};

export const createNewPlaylistWithTracks = async (
  playlistName: string,
  token: string,
  userId: string,
  tracks: any
) => {
  const newEmptyPlaylist = await createEmptyPlaylist(token, userId, playlistName);

  const tracksUris = extractUris(tracks);

  const filledPlaylist = await addTracksToPlaylist(token, newEmptyPlaylist.id, tracksUris);

  console.log('success!', filledPlaylist);
};
