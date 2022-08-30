import { HTTPUserTracksResponse } from './spotify.interface';
import {
  addTracksToPlaylist,
  createEmptyPlaylist,
  extractUris,
  post,
  postWithCookie,
  savedDataExtractor,
} from './spotify.service';

export const playTrack = async (
  deviceId: string,
  token: string,
  uri: string
): Promise<void> => {
  await post('/playback', {
    token,
    deviceId,
    uri,
  });
};

export const authorizeSpotify = async (uid: string) => {
  const response = await postWithCookie('/auth', { uid });
  return (window.location.href = response);
};

export const refreshToken = async (uid: string) => {
  const response = await post('/auth/refresh', { id: uid });
  return response;
};

export const getSpotifyUserData = async (token: string) => {
  const spotifyUser = await post('/user', { token });
  return spotifyUser;
};

export const createNewPlaylistWithTracks = async (
  playlistName: string,
  token: string,
  userId: string,
  tracks: any
) => {
  const newEmptyPlaylist = await createEmptyPlaylist(
    token,
    userId,
    playlistName
  );

  const tracksUris = extractUris(tracks);

  const filledPlaylist = await addTracksToPlaylist(
    token,
    newEmptyPlaylist.id,
    tracksUris
  );

  console.log('success!', filledPlaylist);
};

export const getInitalUserSavedTracks = async (token: string) => {
  const userSavedTracks: HTTPUserTracksResponse = await post('/user/saved', {
    token,
  });

  const data = savedDataExtractor(userSavedTracks.items);

  return {
    total: userSavedTracks.total,
    nextUrl: userSavedTracks.next,
    savedTracks: data,
    filteredTracks: data,
  };
};

export const getNextUserSavedTracks = async (token: string, url: string) => {
  const nextUserSavedTracks: HTTPUserTracksResponse = await post('/user/next', {
    token,
    url,
  });

  const data = savedDataExtractor(nextUserSavedTracks.items);

  return {
    nextUrl: nextUserSavedTracks.next,
    savedTracks: data,
  };
};
