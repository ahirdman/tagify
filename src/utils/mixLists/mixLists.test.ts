import { describe, it, expect } from 'vitest';
import { createListFromMatches, findMixMatches, IMixMatch } from './mixLists';
import {
  playlistJoeyBusta,
  playlistJoey,
  playlistJoeySecond,
  resultJoey,
  resultJoeyCapital,
  resultJoeyReversed,
  resultJoeyOneCapital,
} from './testData';

describe('Find potential mixes', () => {
  it.todo('Finds a simple match', () => {
    const matches = findMixMatches([playlistJoeyBusta, playlistJoey], [playlistJoeySecond]);

    const expectedResult: IMixMatch[] = [
      {
        name: 'night cruising',
        color: 'linear-gradient(to bottom right, rgb(245, 130, 63), rgb(184, 67, 62))',
        ids: ['1', '2'],
      },
    ];

    expect(matches).toEqual(expectedResult);
  });

  it('Disregard a previously created match', () => {
    const matches = findMixMatches([playlistJoeyBusta, playlistJoey], [resultJoey]);

    const expectedResult: IMixMatch[] = [];

    expect(matches).toEqual(expectedResult);
  });

  it('Disregard a previously created match: Same name, different capital', () => {
    const firstResult = findMixMatches([playlistJoeyBusta, playlistJoey], [resultJoeyOneCapital]);
    const secondResult = findMixMatches([playlistJoeyBusta, playlistJoey], [resultJoeyCapital]);

    const expectedResult: IMixMatch[] = [];

    expect(firstResult).toEqual(expectedResult);
    expect(secondResult).toEqual(expectedResult);
  });

  it('Disregard a previously created match: Reversed name', () => {
    const matches = findMixMatches([playlistJoeyBusta, playlistJoey], [resultJoeyReversed]);

    const expectedResult: IMixMatch[] = [];

    expect(matches).toEqual(expectedResult);
  });
});

describe('Create mixed list', () => {
  it('Single potential match as input', () => {
    const mixMatch: IMixMatch = {
      name: 'night cruising',
      color: 'linear-gradient(to bottom right, rgb(245, 130, 63), rgb(184, 67, 62))',
      ids: ['1', '2'],
    };

    const newPlaylist = createListFromMatches(mixMatch, [playlistJoeyBusta, playlistJoey]);

    expect(newPlaylist.name).toEqual(mixMatch.name);
    expect(newPlaylist.color).toEqual(mixMatch.color);
    expect(newPlaylist.tracks.length).toEqual(1);
  });
});
