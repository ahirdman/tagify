import { cloudFunction, axiosInstance } from '../index';
import { isAuthenticated } from '../common/common.error';
import { NewPlaylistBody } from './playlist.interface';
import * as Firestore from '../firestore/firestore.repository';

const BASEURL = 'https://api.spotify.com/v1';

export const createSpotifyPlaylist = cloudFunction.onCall(
  async (data: NewPlaylistBody, context) => {
    isAuthenticated(context);

    if (!data.userId || !data.token || !data.playlistName || data.tracks.length < 1) {
      throw new cloudFunction.HttpsError('failed-precondition', 'Missing data in body');
    }

    const newPlaylistResult = await axiosInstance(`${BASEURL}/users/${data.userId}/playlists`, {
      method: 'POST',
      data: JSON.stringify({ name: data.playlistName }),
      headers: { Authorization: `Bearer ${data.token}` },
    });

    const playlistId = await newPlaylistResult.data.id;

    const fillPlaylistResponse = await axiosInstance(`${BASEURL}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      data: JSON.stringify({ uris: data.tracks }),
      headers: { Authorization: `Bearer ${data.token}` },
    });

    const snapshotId = await fillPlaylistResponse.data.snapshot_id;

    await Firestore.updateTagDocPlaylist(
      context.auth!.uid,
      data.playlistName,
      snapshotId,
      playlistId
    );

    return {
      playlistId,
      snapshotId,
    };
  }
);

interface ValidatePlaylistBody {
  playlistId: string;
}

interface GetPlaylistResponse {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: [{}];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
  type: string;
  uri: string;
}

export const validateSnapshot = cloudFunction.onCall(
  async (data: ValidatePlaylistBody, context) => {
    const response = await axiosInstance(`${BASEURL}/playlists/${data.playlistId}`);
  }
);
