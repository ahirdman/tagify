import {
  initialSavedTracks,
  newPlaylist,
  nextSavedTracks,
  playback,
  spotifyProfile,
  spotifyToken,
  topItems,
  validate,
} from './spotify.functions';
import { SavedTracksData } from './spotify.interface';
import { extractUris, postWithCookie, savedDataExtractor } from './spotify.service';

export const getSpotifyToken = async () => {
  const response = await spotifyToken();

  return response.data;
};

export const getSpotifyProfile = async (token: string) => {
  const response = await spotifyProfile({ token });

  return response.data;
};

export const getSpotifyTopItems = async (token: string) => {
  const response = await topItems({ token });

  return response.data;
};

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

export const playTrack = async (deviceId: string, token: string, uri: string): Promise<void> => {
  const response = await playback({ uri, token, deviceId });
  console.log(response.data);
};

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

export const validateSnapshot = async (playlistId: string, snapshotId: string, token: string) => {
  const response = await validate({ playlistId, snapshotId, token });
  return response.data;
};

// Unconverted call

export const authorizeSpotify = async (uid: string) => {
  const response = await postWithCookie('getAuthUrl', { uid });
  return (window.location.href = response);
};
