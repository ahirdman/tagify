import { matchTag } from './db';

interface WIPTagObject {
  tagname: [
    {
      title: string;
      artist: string;
      artowrk: string;
      uri: string;
    }
  ];
}

test('testing works', () => {
  const number = 2;
  expect(number).toBe(2);
});

test('return correct tag name', () => {
  const userTagMap = {
    country: ['correct track', 'incorrect track'],
    aggresive: [['incorrect track', 'incorrect track']],
    driving: ['incorrect track'],
  };
  // const result = matchTag(userTagMap, 'correct track');
});
