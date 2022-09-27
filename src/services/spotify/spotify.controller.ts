import {
  SavedTracksResponse,
  NextTracksBody,
  ProfileResponse,
  TokenBody,
  TokenResponse,
  PlayTrackBody,
  PlaylistBody,
  PlaylistResponse,
  SavedTracksData,
} from './spotify.interface';
import { extractUris, postWithCookie, savedDataExtractor } from './spotify.service';
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

const playback = httpsCallable<PlayTrackBody, string>(functions, 'playSpotifyTrack');

export const playTrack = async (deviceId: string, token: string, uri: string): Promise<void> => {
  const response = await playback({ uri, token, deviceId });
  console.log(response.data);
};

const newPlaylist = httpsCallable<PlaylistBody, PlaylistResponse>(
  functions,
  'createSpotifyPlaylist'
);

/**
 *
 * @param playlistName Name of the playlist to be created
 * @param token A valid sotify token
 * @param userId Spotify user id
 * @param tracksData An array with the tracks to be put in the playlist
 */

export const createNewPlaylistWithTracks = async (
  playlistName: string,
  token: string,
  userId: string,
  tracksData: SavedTracksData[]
) => {
  const tracksUris = extractUris(tracksData);

  const response = await newPlaylist({ playlistName, token, userId, tracks: tracksUris });

  console.log('success!', response.data);

  return response.data;
};

// Unconverted call

export const authorizeSpotify = async (uid: string) => {
  const response = await postWithCookie('getAuthUrl', { uid });
  return (window.location.href = response);
};
