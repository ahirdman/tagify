import { Playlist } from '../../../store/playlists/playlists.interface';
import { createMatchLists } from './firestore.helper';

describe('match lists', () => {
  const tracks1 = [
    {
      album: '2000',
      artist: 'Joey Bada$$',
      artworkMedium: 'https://i.scdn.co/image/ab67616d00001e02aacc3ddf3bfa01f4bd44cacc',
      artworkSmall: 'https://i.scdn.co/image/ab67616d00004851aacc3ddf3bfa01f4bd44cacc',
      duration: 244653,
      title: 'Eulogy',
      uri: 'spotify:track:18M1K6KD1OmgJZY4h4zEn4',
    },
    {
      album: 'Extinction Level Event 2: The Wrath of God',
      artist: 'Busta Rhymes',
      artworkMedium: 'https://i.scdn.co/image/ab67616d00001e0229b216de65b23e754b9dcc98',
      artworkSmall: 'https://i.scdn.co/image/ab67616d0000485129b216de65b23e754b9dcc98',
      duration: 239015,
      title: 'Master Fard Muhammad',
      uri: 'spotify:track:0mmWdpXuHim7reqIHJdi26',
    },
  ];

  const tracks2 = [
    {
      album: '2000',
      artist: 'Joey Bada$$',
      artworkMedium: 'https://i.scdn.co/image/ab67616d00001e02aacc3ddf3bfa01f4bd44cacc',
      artworkSmall: 'https://i.scdn.co/image/ab67616d00004851aacc3ddf3bfa01f4bd44cacc',
      duration: 244653,
      title: 'Eulogy',
      uri: 'spotify:track:18M1K6KD1OmgJZY4h4zEn4',
    },
  ];

  const playlist1: Playlist = {
    name: 'night',
    color: 'red',
    tracks: tracks1,
    exported: true,
    playlistId: '123',
    snapshotId: '456',
    isActive: false,
    status: {
      sync: 'SYNCED',
      exporting: false,
      error: false,
    },
  };

  const playlist2: Playlist = {
    name: 'cruising',
    color: 'red',
    tracks: tracks2,
    exported: true,
    playlistId: '123',
    snapshotId: '456',
    isActive: false,
    status: {
      sync: 'SYNCED',
      exporting: false,
      error: false,
    },
  };

  const result: Playlist = {
    name: 'night cruising',
    color: 'random',
    tracks: [
      {
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
    playlistId: '789',
    snapshotId: '789',
    isActive: false,
    status: {
      sync: 'UNSYNCED',
      exporting: false,
      error: false,
    },
  };

  test('merge list', () => {
    const merge = createMatchLists([playlist1, playlist2]);
    expect(merge).toContainEqual(result);
  });
});
