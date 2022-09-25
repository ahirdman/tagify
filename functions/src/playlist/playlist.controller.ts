import {cloudFunction, axiosInstance} from "../index";
import {isAuthenticated} from "../common/common.error";
import {NewPlaylistBody} from "./playlist.interface";

const BASEURL = "https://api.spotify.com/v1/";

export const createSpotifyPlaylist = cloudFunction.onCall(
    async (data: NewPlaylistBody, context) => {
      isAuthenticated(context);

      if (!data.userId || !data.token || !data.playlistName || data.tracks.length < 1) {
        throw new cloudFunction.HttpsError("failed-precondition", "Missing data in body");
      }

      const newPlaylistResult = await axiosInstance(`${BASEURL}users/${data.userId}/playlists`, {
        method: "POST",
        data: JSON.stringify({name: data.playlistName}),
        headers: {Authorization: `Bearer ${data.token}`},
      });

      const playlistId = await newPlaylistResult.data.id;

      const fillPlaylistResponse = await axiosInstance(`${BASEURL}playlists/${playlistId}/tracks`, {
        method: "POST",
        data: JSON.stringify({uris: data.tracks}),
        headers: {Authorization: `Bearer ${data.token}`},
      });

      return {playlist: fillPlaylistResponse.data};
    }
);
