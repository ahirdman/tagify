import {cloudFunction, axiosInstance} from "../index";
import {NextTracksBody, UserResponse} from "./user.interface";
import {isAuthenticated} from "../common/common.error";
import {TokenBody} from "../common/common.interface";

const URL = "https://api.spotify.com/v1/me";

export const getSpotifyProfile = cloudFunction.onCall(async (data: TokenBody, context) => {
  isAuthenticated(context);

  const results = await axiosInstance(URL, {
    headers: {Authorization: `Bearer ${data.token}`},
  });

  const profile: UserResponse = results.data;

  return {
    image: profile.images[0].url,
    name: profile.display_name,
    id: profile.id,
  };
});

export const getInitialSavedTracks = cloudFunction.onCall(async (data: TokenBody, context) => {
  isAuthenticated(context);

  const market = "market=ES";
  const limit = "limit=50";
  const offset = "offset=0";

  const results = await axiosInstance(`${URL}/tracks?${market}&${limit}&${offset}`, {
    headers: {Authorization: `Bearer ${data.token}`},
  });
  return results.data;
});

export const getNextSavedTracks = cloudFunction.onCall(async (data: NextTracksBody, context) => {
  isAuthenticated(context);

  const results = await axiosInstance(data.url, {
    headers: {Authorization: `Bearer ${data.token}`},
  });

  return results.data;
});
