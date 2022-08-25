import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { scope, generateRandomString } from './auth.service';
import 'dotenv/config';
import * as AuthService from './auth.service';

const router = express.Router();
let user: string;

router.post('/', (req: Request, res: Response) => {
  const id = JSON.parse(req.body.data);
  user = id.uid;
  const state = generateRandomString(16);

  const authParams = new URLSearchParams({
    response_type: 'code',
    client_id: AuthService.clientId,
    scope,
    redirect_uri: AuthService.redirectUri,
    state,
  });

  res
    .setHeader('Access-Control-Allow-Credentials', 'true')
    .cookie(AuthService.stateName, state)
    .json(`https://accounts.spotify.com/authorize?${authParams.toString()}`);
});

router.get(
  '/callback',
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string; // || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[AuthService.stateName] : null;

    if (state === null || state !== storedState) {
      res.json({ error: 'state mismatch' });
    }

    const form = new URLSearchParams();
    form.append('code', code);
    form.append('redirect_uri', AuthService.redirectUri);
    form.append('grant_type', 'authorization_code');

    try {
      const response = await axios('https://accounts.spotify.com/api/token', {
        method: 'post',
        data: form,
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${AuthService.clientId}:${AuthService.clientSecret}`
          ).toString('base64')}`,
        },
      });

      const { access_token, expires_in, refresh_token } = response.data;

      await AuthService.setUserDoc(
        user,
        access_token,
        expires_in,
        refresh_token
      );

      res.clearCookie(AuthService.stateName).redirect(AuthService.baseUrl);
    } catch (error) {
      next(error);
    }
  }
);

interface IServerTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

interface IUSerDocument {
  spotifyAuth: boolean;
  spotifyRefreshToken: string;
  spotifyAccessToken: string;
  spotifyExpires: number;
  spotifyTokenTimestamp: IServerTimestamp;
}

// POST refreshed token
router.post(
  '/refresh',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body.data;

    try {
      const userDoc = (await AuthService.getUserDoc(id)) as IUSerDocument;

      const form = new URLSearchParams();
      form.append('grant_type', 'refresh_token');
      form.append('refresh_token', userDoc.spotifyRefreshToken);

      const response = await axios('https://accounts.spotify.com/api/token', {
        method: 'post',
        data: form,
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${AuthService.clientId}:${AuthService.clientSecret}`
          ).toString('base64')}`,
        },
      });

      const { access_token, expires_in } = response.data;

      await AuthService.updateUserDoc(id, access_token, expires_in);

      res.json({
        access_token,
        expires_in,
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router as default };
