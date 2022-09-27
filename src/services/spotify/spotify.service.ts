import axios from 'axios';
import { SERVER } from '../../config/server';
import { IUserSavedObject, SavedTracksData } from './spotify.interface';

axios.defaults.baseURL = SERVER;

export const postWithCookie = async (path: string, body: any) => {
  const response = await axios.post(
    `${SERVER}/api/auth/${path}`,
    { data: JSON.stringify(body.uid) },
    { withCredentials: true }
  );
  return response.data;
};

export const extractUris = (arr: SavedTracksData[]): string[] =>
  arr.map((track: SavedTracksData) => track.uri);

export const savedDataExtractor = (data: IUserSavedObject[]): SavedTracksData[] =>
  data.map(({ track }) => ({
    title: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    artworkSmall: track.album.images[2].url,
    artworkMedium: track.album.images[1].url,
    uri: track.uri,
    duration: track.duration_ms,
  }));
