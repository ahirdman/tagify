import { StoredCookie } from './auth.interface';
import { axiosInstance } from '../index';
import * as AuthService from './auth.service';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/getAuthUrl', (req: Request, res: Response) => {
  if (!req.body.data) {
    res.json({ error: 'no body' });
  }
  const id = JSON.parse(req.body.data);
  const state = AuthService.generateRandomString(16);

  const authParams = new URLSearchParams({
    response_type: 'code',
    client_id: AuthService.clientId,
    scope: AuthService.scope,
    redirect_uri: AuthService.redirectUri,
    state,
  });

  res
    .cookie('spotify', { [AuthService.stateName]: state, context: id })
    .json(`https://accounts.spotify.com/authorize?${authParams.toString()}`);
});

router.get('/callback', async (req: Request, res: Response) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const stored: StoredCookie = req.cookies['spotify'];

  if (state === null || state !== stored[AuthService.stateName]) {
    res.json({ error: 'State mismatch' });
  }

  if (stored.context === null) {
    res.json({ error: 'Invalid context' });
  }

  if (typeof code !== 'string') {
    res.json({ error: 'Invalid code' });
  }

  const form = new URLSearchParams();
  form.append('code', code as string);
  form.append('redirect_uri', AuthService.redirectUri);
  form.append('grant_type', 'authorization_code');

  try {
    const response = await axiosInstance('https://accounts.spotify.com/api/token', {
      method: 'post',
      data: form,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${AuthService.clientId}:${AuthService.clientSecret}`
        ).toString('base64')}`,
      },
    });

    const { access_token, expires_in, refresh_token } = response.data;

    await AuthService.setUserDoc(stored.context, access_token, expires_in, refresh_token);

    res.redirect(AuthService.baseUrl);
  } catch (error) {
    res.json({ error });
  }
});

export { router as default };
