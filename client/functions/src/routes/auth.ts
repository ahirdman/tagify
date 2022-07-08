import express from "express";
import axios from "axios";
import {scope, generateRandomString} from "../modules/index.js";
import "dotenv/config";

interface IAccessData {
  access_token: string | null;
  token_type: string | null;
  scope: string | null;
  expires_in: number | null;
  refresh_token: string | null;
}

const clientId = process.env.CLIENT_ID as string;
const clientSecret = process.env.CLIENT_SECRET as string;
const redirectUri = process.env.REDIRECT_URI as string;
const stateName = "spotify_auth_state";

let accessData: IAccessData;

const baseUrl =
  process.env.NODE_ENV === "production" ?
    "https://spotifymoody.herokuapp.com/" :
    "http://localhost:3000";

const router = express.Router();

router.get("/", (_, res) => {
  const state = generateRandomString(16);

  const authParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    redirect_uri: redirectUri,
    state,
  });

  res
      .cookie(stateName, state)
      .redirect(
          `https://accounts.spotify.com/authorize?${authParams.toString()}`
      );
});

router.get("/callback", async (req, res) => {
  const code = req.query.code as string; // || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateName] : null;

  if (state === null || state !== storedState) {
    res.json("state mismatch");
  }

  const form = new URLSearchParams();
  form.append("code", code);
  form.append("redirect_uri", redirectUri);
  form.append("grant_type", "authorization_code");

  try {
    const response = await axios("https://accounts.spotify.com/api/token", {
      method: "post",
      data: form,
      headers: {
        Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`
        ).toString("base64")}`,
      },
    });
    const data: unknown = response;

    accessData = data as IAccessData;

    res.clearCookie(stateName).redirect(baseUrl);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/token", async (_, res) => {
  try {
    res.json({access_token: accessData.access_token});
  } catch (error) {
    res.sendStatus(500);
  }
});

export {router as default};
