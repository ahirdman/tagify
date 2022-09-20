import axios from 'axios';
import { SERVER } from '../../config/server';
import { IFirestoreTrack } from '../firebase/firestore/firestore.interface';
import { IUserSavedObject, SavedTracksData } from './spotify.interface';

axios.defaults.baseURL = SERVER;

export const post = async (path: string, data: any) => {
  const response = await axios.post(path, { data });
  return response.data;
};

export const postWithCookie = async (path: string, body: any) => {
  const data = JSON.stringify(body);
  const response = await axios.post(path, { data }, { withCredentials: true });
  return response.data;
};

export const extractUris = (arr: IFirestoreTrack[]): string[] =>
  arr.map((track: IFirestoreTrack) => track.uri);

export const addTracksToPlaylist = async (token: string, playlistId: string, tracks: string[]) => {
  await post('/playlist/add', {
    token,
    playlistId,
    tracks,
  });
};

export const createEmptyPlaylist = async (token: string, userId: string, playlistName: string) => {
  const newPlaylist = await post('/playlist', {
    token,
    userId,
    playlistName,
  });
  return newPlaylist.id;
};

export const savedDataExtractor = (data: IUserSavedObject[]): SavedTracksData[] =>
  data.map(({ track }) => ({
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    artworkSmall: track.album.images[2].url,
    artworkMedium: track.album.images[1].url,
    uri: track.uri,
  }));
