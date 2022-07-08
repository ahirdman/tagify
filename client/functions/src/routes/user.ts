import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async ({body: {token}}, res) => {
  try {
    const results = await axios("https://api.spotify.com/v1/me", {
      headers: {Authorization: `Bearer ${token}`},
    });
    res.send(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/saved", async ({body: {token}}, res) => {
  try {
    const results = await axios(
        "https://api.spotify.com/v1/me/tracks?market=ES&limit=50&offset=0",
        {
          headers: {Authorization: `Bearer ${token}`},
        }
    );
    res.send(results);
  } catch (error) {
    res.sendStatus(500);
  }
});

export {router as default};
