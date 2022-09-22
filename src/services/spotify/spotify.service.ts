import axios from 'axios';
import { SERVER } from '../../config/server';
import { IFirestoreTrack } from '../firebase/firestore/firestore.interface';
import { IUserSavedObject, SavedTracksData } from './spotify.interface';

axios.defaults.baseURL = SERVER;

export const postWithCookie = async (path: string, body: any) => {
  const data = JSON.stringify(body);
  const response = await axios.post(path, { data }, { withCredentials: true });
  return response.data;
};

export const extractUris = (arr: IFirestoreTrack[]): string[] =>
  arr.map((track: IFirestoreTrack) => track.uri);

export const savedDataExtractor = (data: IUserSavedObject[]): SavedTracksData[] =>
  data.map(({ track }) => ({
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    artworkSmall: track.album.images[2].url,
    artworkMedium: track.album.images[1].url,
    uri: track.uri,
  }));
