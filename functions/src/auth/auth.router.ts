import express, { Request, Response } from 'express';
import axios from 'axios';
import { scope, generateRandomString } from './auth.service';
import 'dotenv/config';
import { IAccessData } from './auth.interface';
import * as AuthService from './auth.service';

const router = express.Router();
let accessData: IAccessData;

router.get('/', (_, res: Response) => {
  const state = generateRandomString(16);

  const authParams = new URLSearchParams({
    response_type: 'code',
    client_id: AuthService.clientId,
    scope,
    redirect_uri: AuthService.redirectUri,
    state,
  });

  res
    .cookie(AuthService.stateName, state)
    .redirect(
      `https://accounts.spotify.com/authorize?${authParams.toString()}`
    );
});

router.get('/callback', async (req: Request, res: Response) => {
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

    const data: unknown = response.data;

    accessData = data as IAccessData;

    res.clearCookie(AuthService.stateName).redirect(AuthService.baseUrl);
  } catch (error) {
    res.sendStatus(500);
  }
});

// GET token
router.get('/token', async (_, res: Response) => {
  try {
    res.json({
      access_token: accessData.access_token,
      refresh_token: accessData.refresh_token,
      expires_in: accessData.expires_in,
    });
  } catch (error: any) {
    res.status(404).send(error.message);
  }
});

// GET refreshed token
router.get('/refresh', async (_, res: Response) => {
  if (!accessData.refresh_token) return;

  const form = new URLSearchParams();
  form.append('grant_type', 'refresh_token');
  form.append('refresh_token', accessData.refresh_token);

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

    const data: unknown = response.data;

    accessData = data as IAccessData;

    res.json({
      access_token: accessData.access_token,
      refresh_token: accessData.refresh_token,
      expires_in: accessData.expires_in,
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
