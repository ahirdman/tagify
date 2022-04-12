import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async ({ body: { token } }, res) => {
  try {
    const results = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await results.json();
    res.send(data);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };
