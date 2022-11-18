import { IPlaylist } from '../../store/playlists/playlists.interface';

export const tracksJoeyBusta = [
  {
    id: '111',
    album: '2000',
    artist: 'Joey Bada$$',
    artworkMedium: 'https://i.scdn.co/image/ab67616d00001e02aacc3ddf3bfa01f4bd44cacc',
    artworkSmall: 'https://i.scdn.co/image/ab67616d00004851aacc3ddf3bfa01f4bd44cacc',
    duration: 244653,
    title: 'Eulogy',
    uri: 'spotify:track:18M1K6KD1OmgJZY4h4zEn4',
  },
  {
    id: '222',
    album: 'Extinction Level Event 2: The Wrath of God',
    artist: 'Busta Rhymes',
    artworkMedium: 'https://i.scdn.co/image/ab67616d00001e0229b216de65b23e754b9dcc98',
    artworkSmall: 'https://i.scdn.co/image/ab67616d0000485129b216de65b23e754b9dcc98',
    duration: 239015,
    title: 'Master Fard Muhammad',
    uri: 'spotify:track:0mmWdpXuHim7reqIHJdi26',
  },
];

export const tracksJoey = [
  {
    id: '111',
    album: '2000',
    artist: 'Joey Bada$$',
    artworkMedium: 'https://i.scdn.co/image/ab67616d00001e02aacc3ddf3bfa01f4bd44cacc',
    artworkSmall: 'https://i.scdn.co/image/ab67616d00004851aacc3ddf3bfa01f4bd44cacc',
    duration: 244653,
    title: 'Eulogy',
    uri: 'spotify:track:18M1K6KD1OmgJZY4h4zEn4',
  },
];

export const playlistJoeyBusta: IPlaylist = {
  id: '1',
  createdAt: '2022-11-16T19:14:43.880Z',
  favourite: false,
  name: 'night',
  color: 'rgb(245, 130, 63)',
  type: 'TAG',
  tracks: tracksJoeyBusta,
  exported: true,
  spotifyId: '123',
  snapshotId: '456',
  status: {
    sync: 'SYNCED',
    exporting: false,
    error: false,
  },
};

export const playlistJoey: IPlaylist = {
  id: '2',
  createdAt: '2022-11-16T19:14:43.880Z',
  favourite: false,
  name: 'cruising',
  color: 'rgb(184, 67, 62)',
  type: 'TAG',
  tracks: tracksJoey,
  exported: true,
  spotifyId: '123',
  snapshotId: '456',
  status: {
    sync: 'SYNCED',
    exporting: false,
    error: false,
  },
};

export const playlistJoeySecond: IPlaylist = {
  id: '3',
  createdAt: '2022-11-16T19:14:43.880Z',
  favourite: false,
  name: 'morning',
  color: 'rgb(124, 27, 62)',
  type: 'TAG',
  tracks: tracksJoey,
  exported: true,
  spotifyId: '123',
  snapshotId: '456',
  status: {
    sync: 'SYNCED',
    exporting: false,
    error: false,
  },
};

export const resultJoey: IPlaylist = {
  id: '22',
  createdAt: '2022-11-16T19:14:43.880Z',
  favourite: false,
  name: 'night cruising',
  color: 'linear-gradient(to bottom right, rgb(245, 130, 63), rgb(184, 67, 62))',
  type: 'MIXED',
  tracks: [
    {
      id: '111',
      album: '2000',
      artist: 'Joey Bada$$',
      artworkMedium: 'https://i.scdn.co/image/ab67616d00001e02aacc3ddf3bfa01f4bd44cacc',
      artworkSmall: 'https://i.scdn.co/image/ab67616d00004851aacc3ddf3bfa01f4bd44cacc',
      duration: 244653,
      title: 'Eulogy',
      uri: 'spotify:track:18M1K6KD1OmgJZY4h4zEn4',
    },
  ],
  exported: false,
  spotifyId: '',
  snapshotId: '',
  status: {
    sync: 'UNSYNCED',
    exporting: false,
    error: false,
  },
};

export const resultJoeyOneCapital: IPlaylist = {
  id: '22',
  createdAt: '2022-11-16T19:14:43.880Z',
  favourite: false,
  name: 'night Cruising',
  color: 'linear-gradient(to bottom right, rgb(245, 130, 63), rgb(184, 67, 62))',
  type: 'MIXED',
  tracks: [
    {
      id: '111',
      album: '2000',
      artist: 'Joey Bada$$',
      artworkMedium: 'https://i.scdn.co/image/ab67616d00001e02aacc3ddf3bfa01f4bd44cacc',
      artworkSmall: 'https://i.scdn.co/image/ab67616d00004851aacc3ddf3bfa01f4bd44cacc',
      duration: 244653,
      title: 'Eulogy',
      uri: 'spotify:track:18M1K6KD1OmgJZY4h4zEn4',
    },
  ],
  exported: false,
  spotifyId: '',
  snapshotId: '',
  status: {
    sync: 'UNSYNCED',
    exporting: false,
    error: false,
  },
};

export const resultJoeyCapital: IPlaylist = {
  id: '22',
  createdAt: '2022-11-16T19:14:43.880Z',
  favourite: false,
  name: 'Night Cruising',
  color: 'linear-gradient(to bottom right, rgb(245, 130, 63), rgb(184, 67, 62))',
  type: 'MIXED',
  tracks: [
    {
      id: '111',
      album: '2000',
      artist: 'Joey Bada$$',
      artworkMedium: 'https://i.scdn.co/image/ab67616d00001e02aacc3ddf3bfa01f4bd44cacc',
      artworkSmall: 'https://i.scdn.co/image/ab67616d00004851aacc3ddf3bfa01f4bd44cacc',
      duration: 244653,
      title: 'Eulogy',
      uri: 'spotify:track:18M1K6KD1OmgJZY4h4zEn4',
    },
  ],
  exported: false,
  spotifyId: '',
  snapshotId: '',
  status: {
    sync: 'UNSYNCED',
    exporting: false,
    error: false,
  },
};

export const resultJoeyReversed: IPlaylist = {
  id: '22',
  createdAt: '2022-11-16T19:14:43.880Z',
  favourite: false,
  name: 'cruising night',
  color: 'linear-gradient(to bottom right, rgb(245, 130, 63), rgb(184, 67, 62))',
  type: 'MIXED',
  tracks: [
    {
      id: '111',
      album: '2000',
      artist: 'Joey Bada$$',
      artworkMedium: 'https://i.scdn.co/image/ab67616d00001e02aacc3ddf3bfa01f4bd44cacc',
      artworkSmall: 'https://i.scdn.co/image/ab67616d00004851aacc3ddf3bfa01f4bd44cacc',
      duration: 244653,
      title: 'Eulogy',
      uri: 'spotify:track:18M1K6KD1OmgJZY4h4zEn4',
    },
  ],
  exported: false,
  spotifyId: '',
  snapshotId: '',
  status: {
    sync: 'UNSYNCED',
    exporting: false,
    error: false,
  },
};
