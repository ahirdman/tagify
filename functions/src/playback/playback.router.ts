import express, { Response } from 'express';
import axios from 'axios';

const router = express.Router();

// Play track
router.post('/', async ({ body: { token, deviceId, uri } }, res: Response) => {
  if (!token || !deviceId || !uri) {
    res.sendStatus(500);
  }
  const putBody = {
    uris: [uri],
  };

  try {
    await axios(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: 'PUT',
        data: JSON.stringify(putBody),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    res.json('playing now');
  } catch (error) {
    res.sendStatus(500);
  }
});

// Save track to users library
router.post('/save', async ({ body: { token, trackId } }, res: Response) => {
  try {
    await axios(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
      method: 'put',
      headers: { Authorization: `Bearer ${token}` },
    });
    res.json('track saved');
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
