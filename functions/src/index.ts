// import * as functions from "firebase-functions";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import express, {Application} from "express";
// import cors from "cors";
// import auth from "./auth/auth.router.js";
// import {errorHandler} from "./middleware/error.middleware.js";
// import {notFoundHandler} from "./middleware/not-found.middleware.js";
import admin from "firebase-admin";
import * as functions from "firebase-functions";
import axios from "axios";

admin.initializeApp();

export const cloudFunction = functions.https;
export const db = admin.firestore();
export const fieldValue = admin.firestore.FieldValue;
export const axiosInstance = axios;

// const app: Application = express();

// app.use(cors({origin: true}));
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// app.use("/auth", auth);
// app.use(errorHandler);
// app.use(notFoundHandler);

export {spotifyToken, getAuthUrl, callback} from "./auth/auth.controller";
export {
  getSpotifyProfile,
  getInitialSavedTracks,
  getNextSavedTracks,
} from "./user/user.controller";
export {playSpotifyTrack} from "./playback/playback.controller";
export {createSpotifyPlaylist} from "./playlist/playlist.controller";
