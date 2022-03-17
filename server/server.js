import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import auth from './routes/auth.js'
import user from './routes/user.js'
import playback from './routes/playback.js'

const PORT = 8080;

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_, res) => {
  res.json('Hello Motherflowers!');
});

app.use('/auth', auth);
app.use('/user', user);
app.use('/playback', playback);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
