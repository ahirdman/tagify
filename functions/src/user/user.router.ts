import express, { Response } from 'express';
import axios from 'axios';

const router = express.Router();
const baseUrl = 'https://api.spotify.com/v1/me';

// GET users profile
router.post('/', async ({ body: { token } }, res: Response) => {
  try {
    const results = await axios(baseUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

// GET 50 first users saved tracks
router.post('/saved', async ({ body: { token } }, res: Response) => {
  const market = 'market=ES';
  const limit = 'limit=50';
  const offset = 'offset=0';

  try {
    const results = await axios(
      `${baseUrl}/tracks?${market}&${limit}&${offset}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

// GET next users saved tracks
router.post('/next', async ({ body: { token, url } }, res: Response) => {
  try {
    const results = await axios(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.send(results.data);
  } catch (error) {
    res.sendStatus(500);
  }
});

export { router as default };

// const repeater = async (url: string, token: string) => {
//   try {
//     const results = await axios(url, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return results.data;
//   } catch (error) {
//     return error;
//   }
// };

// router.post('/saved', async ({ body: { token } }, res) => {
//   const market = 'market=ES';
//   const limit = 'limit=50';
//   const offset = 'offset=0';

//   try {
//     console.log('running first');

//     const tracks = [];
//     let nextUrl;

//     const results = await axios(
//       `${baseUrl}/tracks?${market}&${limit}&${offset}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     nextUrl = results.data.next;
//     tracks.push(results.data.items);

//     while (typeof nextUrl !== 'undefined') {
//       const nextTracks: any = await repeater(nextUrl, token);
//       tracks.push(nextTracks.items);
//       console.log(nextTracks.next);
//       nextUrl = nextTracks.next;
//     }

//     console.log(tracks.flat());

//     res.send(tracks.flat());
//   } catch (error) {
//     res.sendStatus(500);
//   }
// });
