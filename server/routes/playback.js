import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
  const { token } = req.body;
  const deviceId = req.body.trackId;

  const body = {
    device_ids: [deviceId],
    play: 'true',
  };

  try {
    await fetch(
      'https://api.spotify.com/v1/me/player',
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    res.json('playing now');
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/track', async (req, res) => {
  const { token } = req.body;
  const { trackId } = req.body;

  try {
    const results = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await results.json();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/save', async (req, res) => {
  const { token } = req.body;
  const { trackId } = req.body;

  try {
    await fetch(
      `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
      {
        method: 'put',
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    res.json('track saved');
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
