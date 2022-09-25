import * as AuthService from "./auth.service";
import {FireStoreUserDocument, RefreshTokenResponse, StoredCookie} from "./auth.interface";
import {ExperationObj} from "../Utils/date/date.interface";
import {hasExpired} from "../Utils/date/date.service";
import {isAuthenticated} from "../common/common.error";
import {cloudFunction, axiosInstance} from "../index";
// import 'dotenv/config';

export const spotifyToken = cloudFunction.onCall(async (_, context) => {
  isAuthenticated(context);

  const uid = context.auth!.uid as string;

  const userDoc = (await AuthService.getUserDoc(uid)) as FireStoreUserDocument;

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

  await AuthService.updateUserDoc(uid, data.access_token, data.expires_in);

  return {
    accessToken: data.access_token,
  };
};

export const getAuthUrl = cloudFunction.onRequest((req, res) => {
  const id = JSON.parse(req.body.data);
  const state = AuthService.generateRandomString(16);

  const authParams = new URLSearchParams({
    response_type: "code",
    client_id: AuthService.clientId,
    scope: AuthService.scope,
    redirect_uri: AuthService.redirectUri,
    state,
  });

  res
      .setHeader("Access-Control-Allow-Credentials", "true")
      .cookie("spotify", {[AuthService.stateName]: state, context: id.uid})
      .json(`https://accounts.spotify.com/authorize?${authParams.toString()}`);
});

export const callback = cloudFunction.onRequest(async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const stored: StoredCookie = req.cookies["spotify"];

  if (state === null || state !== stored[AuthService.stateName]) {
    res.json({error: "State mismatch"});
  }

  if (stored.context === null) {
    res.json({error: "Invalid context"});
  }

  if (typeof code !== "string") {
    res.json({error: "Invalid code"});
  }

  const form = new URLSearchParams();
  form.append("code", code as string);
  form.append("redirect_uri", AuthService.redirectUri);
  form.append("grant_type", "authorization_code");

  try {
    const response = await axiosInstance("https://accounts.spotify.com/api/token", {
      method: "post",
      data: form,
      headers: {
        Authorization: `Basic ${Buffer.from(
            `${AuthService.clientId}:${AuthService.clientSecret}`
        ).toString("base64")}`,
      },
    });

    const {access_token, expires_in, refresh_token} = response.data;

    await AuthService.setUserDoc(stored.context, access_token, expires_in, refresh_token);

    res.clearCookie("spotify").redirect(AuthService.baseUrl);
  } catch (error) {
    res.json({error});
  }
});
