import * as AuthService from "./auth.service";
import * as Firestore from "../firestore/firestore.repository";
import {FireStoreUserDocument, RefreshTokenResponse} from "./auth.interface";
import {ExperationObj} from "../Utils/date/date.interface";
import {hasExpired} from "../Utils/date/date.service";
import {isAuthenticated} from "../common/common.error";
import {cloudFunction, axiosInstance} from "../index";

export const spotifyToken = cloudFunction.onCall(async (_, context) => {
  isAuthenticated(context);

  const uid = context.auth?.uid as string;

  const userDoc = (await Firestore.getUserDoc(uid)) as FireStoreUserDocument;

  const tokenHasExpired: ExperationObj = hasExpired(
      userDoc.spotifyTokenTimestamp,
      userDoc.spotifyExpires
  );

  if (tokenHasExpired.expired) {
    const accessToken = await refreshToken(userDoc.spotifyRefreshToken, uid);

    return accessToken;
  }

  return {
    accessToken: userDoc.spotifyAccessToken,
  };
});

const refreshToken = async (refreshToken: string, uid: string) => {
  const form = new URLSearchParams();
  form.append("grant_type", "refresh_token");
  form.append("refresh_token", refreshToken);

  const response = await axiosInstance("https://accounts.spotify.com/api/token", {
    method: "post",
    data: form,
    headers: {
      Authorization: `Basic ${Buffer.from(
          `${AuthService.clientId}:${AuthService.clientSecret}`
      ).toString("base64")}`,
    },
  });

  const data: RefreshTokenResponse = response.data;

  await Firestore.updateUserDoc(uid, data.access_token, data.expires_in);

  return {
    accessToken: data.access_token,
  };
};
