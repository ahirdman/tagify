import express, { Response, NextFunction } from 'express';
import axios from 'axios';

const router = express.Router();
const baseUrl = 'https://api.spotify.com/v1/me';

// GET users profile
router.post(
  '/',
  async ({ body: { data } }, res: Response, next: NextFunction) => {
    try {
      const results = await axios(baseUrl, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      res.send(results.data);
    } catch (error) {
      next(error);
    }
  }
);

// GET 50 first users saved tracks
router.post(
  '/saved',
  async ({ body: { data } }, res: Response, next: NextFunction) => {
    const market = 'market=ES';
    const limit = 'limit=50';
    const offset = 'offset=0';

    try {
      const results = await axios(
        `${baseUrl}/tracks?${market}&${limit}&${offset}`,
        {
          headers: { Authorization: `Bearer ${data.token}` },
        }
      );
      res.send(results.data);
    } catch (error) {
      next(error);
    }
  }
);

// GET next users saved tracks
router.post(
  '/next',
  async ({ body: { data } }, res: Response, next: NextFunction) => {
    try {
      const results = await axios(data.url, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      res.send(results.data);
    } catch (error) {
      next(error);
    }
  }
);

export { router as default };
