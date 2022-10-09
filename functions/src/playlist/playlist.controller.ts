import {cloudFunction, axiosInstance} from "../index";
import {isAuthenticated} from "../common/common.error";
import {
  NewPlaylistBody,
  ValidatePlaylistBody,
  ValidatePlaylistReponse,
} from "./playlist.interface";
import * as Firestore from "../firestore/firestore.repository";

const BASEURL = "https://api.spotify.com/v1";

export const createSpotifyPlaylist = cloudFunction.onCall(
    async (data: NewPlaylistBody, context) => {
      isAuthenticated(context);

      if (!data.userId || !data.token || !data.playlistName || data.tracks.length < 1) {
        throw new cloudFunction.HttpsError("failed-precondition", "Missing data in body");
      }

      const newPlaylistResult = await axiosInstance(`${BASEURL}/users/${data.userId}/playlists`, {
        method: "POST",
        data: JSON.stringify({name: data.playlistName}),
        headers: {Authorization: `Bearer ${data.token}`},
      });

      const playlistId = await newPlaylistResult.data.id;

      const fillPlaylistResponse = await axiosInstance(`${BASEURL}/playlists/${playlistId}/tracks`, {
        method: "POST",
        data: JSON.stringify({uris: data.tracks}),
        headers: {Authorization: `Bearer ${data.token}`},
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

export const validateSnapshot = cloudFunction.onCall(async (data: ValidatePlaylistBody, _) => {
  const response = await axiosInstance(
      `${BASEURL}/playlists/${data.playlistId}?fields=snapshot_id`,
      {
        method: "GET",
        headers: {Authorization: `Bearer ${data.token}`},
      }
  );

  const result: ValidatePlaylistReponse = response.data;

  return {
    snapshotId: result.snapshot_id,
  };
});
