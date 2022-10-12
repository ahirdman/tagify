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
    id: '1',
    name: 'night',
    color: 'rgb(245, 130, 63)',
    type: 'TAG',
    created: false,
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
    id: '1',
    name: 'cruising',
    color: 'rgb(184, 67, 62)',
    type: 'TAG',
    created: false,
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

  const playlist3: Playlist = {
    id: '1',
    name: 'morning',
    color: 'rgb(124, 27, 62)',
    type: 'TAG',
    created: false,
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

  const result1: Playlist = {
    id: '22',
    name: 'night cruising',
    color: 'linear-gradient(to bottom right, rgb(245, 130, 63), rgb(184, 67, 62))',
    type: 'MIXED',
    created: false,
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
    playlistId: '',
    snapshotId: '',
    isActive: false,
    status: {
      sync: 'UNSYNCED',
      exporting: false,
      error: false,
    },
  };

  const result2: Playlist = {
    id: 'ss',
    name: 'cruising morning',
    color: 'linear-gradient(to bottom right, rgb(245, 130, 63), rgb(124, 27, 62))',
    type: 'MIXED',
    created: false,
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
    playlistId: '',
    snapshotId: '',
    isActive: false,
    status: {
      sync: 'UNSYNCED',
      exporting: false,
      error: false,
    },
  };

  test('Merge works for two playlists', () => {
    const merge = createMatchLists([playlist1, playlist2]);
    expect(merge).toEqual([result1]);
  });

  test.only('Merge creates two mixed lists when multiple lists matches', () => {
    const merge = createMatchLists([playlist1, playlist2, playlist3]);
    expect(merge).toEqual([result1, result2]);
  });
});
